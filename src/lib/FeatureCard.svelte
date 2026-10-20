<script>
  // tone: 'default' 또는 'warning'. 주의가 필요한 내용은 주의 색 카드로 보여 준다.
  let { title, body, tone = 'default' } = $props();
</script>

<article class="card {tone}">
  <h3>{title}</h3>
  <p>{body}</p>
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-6);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-large);
    background: var(--color-surface);
    min-width: 0;
  }

  .card.warning {
    border-color: transparent;
    background: var(--color-warning-soft);
  }

  h3 {
    font-size: var(--text-subtitle);
    font-weight: 700;
  }

  .warning h3 {
    color: var(--color-warning);
  }

  p {
    color: var(--color-ink-muted);
  }
</style>
