import { mount } from 'svelte';
// Pretendard 가변 글꼴. 글자 범위별로 잘게 나뉜 파일 중 페이지에 실제로 쓰인 것만 내려받는다.
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './app.css';
import App from './App.svelte';

// index.html의 <div id="app"> 안에 App 컴포넌트를 그린다.
mount(App, { target: document.getElementById('app') });
