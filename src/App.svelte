<script>
  import Stepper from './lib/Stepper.svelte';
</script>

<header class="topbar">
  <div class="container">
    <span class="wordmark">약올림</span>
  </div>
</header>

<main class="container">
  <section class="hero">
    <h1>약 봉투처럼 정확하고 또렷하게</h1>
    <p class="lead">복약 안내서를 찍으면 약마다 복용 정보를 정리하고 알람을 맞춰 드려요.</p>
  </section>

  <section class="demo">
    <Stepper />
  </section>
</main>

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
    gap: var(--space-12);
    padding-block: var(--space-16);
  }

  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-width: 40ch;
  }

  h1 {
    font-size: var(--text-hero);
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .lead {
    font-size: 18px;
    color: var(--color-ink-muted);
  }

  .demo {
    padding: var(--space-6);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-large);
    background: var(--color-surface);
    width: fit-content;
    max-width: 100%;
  }
</style>
