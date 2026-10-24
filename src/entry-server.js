// 빌드 때 App을 HTML 문자열로 그리는 진입점. vite build --ssr로 묶고 scripts/prerender.js가 실행한다.
import { render } from 'svelte/server';
import App from './App.svelte';

export function renderApp() {
  return render(App);
}
