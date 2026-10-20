<script>
  import Hero from './lib/sections/Hero.svelte';
  import HowItWorks from './lib/sections/HowItWorks.svelte';
  import Safety from './lib/sections/Safety.svelte';
  import TechStack from './lib/sections/TechStack.svelte';
  import AlarmDemo from './lib/sections/AlarmDemo.svelte';
</script>

<header class="topbar">
  <div class="container">
    <span class="wordmark">약올림</span>
  </div>
</header>

<main class="container">
  <Hero />
  <HowItWorks />
  <Safety />

  <AlarmDemo />

  <TechStack />
</main>

<footer class="container footer">
  <p>화면 속 복약 안내서는 시연용으로 만든 예시 자료이며 실제 처방 정보는 없습니다.</p>
  <p>약올림 · 김준기</p>
</footer>

<style>
  /* 모든 섹션이 같은 폭과 좌우 여백을 쓰도록 하는 틀 */
  .container {
    width: 100%;
    max-width: 1040px;
    margin: 0 auto;
    padding-left: max(var(--space-5), env(safe-area-inset-left, 0px));
    padding-right: max(var(--space-5), env(safe-area-inset-right, 0px));
  }

  .topbar {
    border-bottom: 1px solid var(--color-line);
    background: var(--color-canvas);
  }

  .topbar .container {
    display: flex;
    align-items: center;
    min-height: 56px;
  }

  .wordmark {
    font-size: var(--text-title);
    font-weight: 800;
    color: var(--color-ink);
  }

  main {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding-block: var(--space-16);
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding-block: var(--space-8);
    border-top: 1px solid var(--color-line);
    font-size: var(--text-body-small);
    color: var(--color-ink-muted);
  }
</style>
