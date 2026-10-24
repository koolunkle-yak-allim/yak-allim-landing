import { hydrate, mount } from 'svelte';
import './app.css';
import App from './App.svelte';

// 배포 빌드는 scripts/subset-font.js가 페이지에 쓰인 글자만 담은 Pretendard를 index.html에 연결한다.
// 개발 서버에서는 Pretendard의 글자 범위별 CSS를 그대로 쓴다. 빌드에서는 DEV가 false라 이 import가 빠진다.
if (import.meta.env.DEV) import('pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css');

// 빌드 결과에는 scripts/prerender.js가 미리 그린 HTML이 들어 있어 거기에 이벤트만 연결(hydrate)한다.
// 개발 서버에서는 #app이 비어 있으므로 처음부터 그린다(mount).
const target = document.getElementById('app');
if (target.hasChildNodes()) hydrate(App, { target });
else mount(App, { target });
