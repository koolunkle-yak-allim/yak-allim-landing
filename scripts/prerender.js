// 클라이언트 빌드(dist/)의 index.html에 미리 그린 App HTML을 넣는다.
// 순서: vite build → vite build --ssr src/entry-server.js --outDir dist-server → node scripts/prerender.js
// 다 쓴 dist-server/는 지운다. 배포에는 dist/만 올라간다.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = `${root}dist/index.html`;
const serverDir = `${root}dist-server`;
const MOUNT = '<div id="app"></div>';

const { renderApp } = await import(pathToFileURL(`${serverDir}/entry-server.js`).href);
const { head, body } = renderApp();

const html = await readFile(htmlPath, 'utf8');
if (!html.includes(MOUNT)) throw new Error(`dist/index.html에서 ${MOUNT}를 찾지 못했습니다.`);

await writeFile(htmlPath, html.replace('</head>', `${head}</head>`).replace(MOUNT, `<div id="app">${body}</div>`));
await rm(serverDir, { recursive: true, force: true });

console.log(`prerendered dist/index.html (${body.length.toLocaleString()} chars)`);
