// 앱 화면 캡처. 폭별 WebP(360·600·720)를 srcset으로 묶어, 기기 화면 밀도에 맞는 파일만 받게 한다.
// 파일은 src/assets/screens/<이름>-<폭>.webp. 빌드 때 Vite가 해시된 경로로 바꾼다.
const files = import.meta.glob('../assets/screens/*.webp', { eager: true, import: 'default' });

const WIDTHS = [360, 600, 720];

/**
 * @param {string} name 화면 이름 (예: 'result')
 * @returns {{ src: string, srcset: string }}
 */
export function screen(name) {
  const url = (/** @type {number} */ width) => {
    const file = files[`../assets/screens/${name}-${width}.webp`];
    if (!file) throw new Error(`화면 이미지가 없습니다: ${name}-${width}.webp`);
    return /** @type {string} */ (file);
  };
  return {
    src: url(WIDTHS.at(-1)),
    srcset: WIDTHS.map((width) => `${url(width)} ${width}w`).join(', '),
  };
}
