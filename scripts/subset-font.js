// 페이지에 실제로 쓰인 글자만 담은 Pretendard 가변 글꼴을 만들어 dist/index.html에 연결한다.
// prerender.js 다음에 실행한다. 미리 그린 HTML과 JS·CSS 번들의 글자를 모으므로, 문구를 바꾸면 다음 빌드에 자동으로 반영된다.
// 개발 서버는 main.js가 Pretendard의 글자 범위별 CSS를 그대로 불러온다.
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = `${root}dist`;
const source = `${root}node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2`;

// 페이지 코드에는 없지만 브라우저가 Pretendard로 그리는 글자. time 입력의 "오전 08:00" 같은 표시가 여기에 해당한다.
const BROWSER_TEXT = '오전오후';
// app.css에서 쓰는 굵기 범위. 이 밖의 축 데이터는 버려 크기를 줄인다.
const WEIGHT = { min: 400, max: 800 };

const htmlPath = `${dist}/index.html`;
const html = await readFile(htmlPath, 'utf8');
const bundles = (await readdir(`${dist}/assets`)).filter((file) => /\.(js|css)$/.test(file));
const texts = await Promise.all(bundles.map((file) => readFile(`${dist}/assets/${file}`, 'utf8')));

// ASCII는 모두 넣고, 그 밖의 글자는 HTML·번들에 나온 것만 넣는다.
const chars = new Set();
for (let code = 0x20; code < 0x7f; code++) chars.add(String.fromCharCode(code));
for (const char of [html, ...texts, BROWSER_TEXT].join('')) {
  if (char.codePointAt(0) >= 0xa0) chars.add(char);
}

const font = await subsetFont(await readFile(source), [...chars].join(''), {
  targetFormat: 'woff2',
  variationAxes: { wght: { min: WEIGHT.min, max: WEIGHT.max, default: WEIGHT.min } },
});

// 다른 에셋처럼 내용 해시를 이름에 넣어, 글자가 바뀌면 새 파일로 받게 한다.
const hash = createHash('sha256').update(font).digest('base64url').slice(0, 8);
const fileName = `pretendard-subset-${hash}.woff2`;
await writeFile(`${dist}/assets/${fileName}`, font);

// Vite가 붙인 base 경로(/yak-allim-landing/)를 CSS 링크에서 읽어 같은 규칙으로 주소를 만든다.
const base = html.match(/href="([^"]*)assets\/index-[^"]+\.css"/)?.[1];
if (base === undefined) throw new Error('dist/index.html에서 CSS 링크를 찾지 못했습니다.');
const url = `${base}assets/${fileName}`;

const fontHead = [
  `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin>`,
  `<style>@font-face{font-family:"Pretendard Variable";font-style:normal;font-weight:${WEIGHT.min} ${WEIGHT.max};` +
    `font-display:swap;src:url("${url}") format("woff2-variations")}</style>`,
].join('');
await writeFile(htmlPath, html.replace('</head>', `${fontHead}</head>`));

console.log(`subset font ${fileName}: ${chars.size} chars, ${Math.round(font.length / 1024)}KB`);
