import { hydrate, mount } from 'svelte';
// Pretendard 가변 글꼴. 글자 범위별로 잘게 나뉜 파일 중 페이지에 실제로 쓰인 것만 내려받는다.
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './app.css';
import App from './App.svelte';

// 빌드 결과에는 scripts/prerender.js가 미리 그린 HTML이 들어 있어 거기에 이벤트만 연결(hydrate)한다.
// 개발 서버에서는 #app이 비어 있으므로 처음부터 그린다(mount).
const target = document.getElementById('app');
if (target.hasChildNodes()) hydrate(App, { target });
else mount(App, { target });
