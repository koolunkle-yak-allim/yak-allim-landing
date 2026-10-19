import { mount } from 'svelte';
import App from './App.svelte';

// index.html의 <div id="app"> 안에 App 컴포넌트를 그린다.
mount(App, { target: document.getElementById('app') });
