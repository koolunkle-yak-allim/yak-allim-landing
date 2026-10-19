<script>
  // 앱의 알람 설정 시트에 있는 "1일 횟수" 스테퍼와 같은 규칙: 1~8회.
  const MIN = 1;
  const MAX = 8;

  let count = $state(3);
</script>

<div class="stepper">
  <span class="label">1일 횟수</span>
  <button onclick={() => count--} disabled={count <= MIN} aria-label="1일 횟수 줄이기">−</button>
  <output>{count}회</output>
  <button onclick={() => count++} disabled={count >= MAX} aria-label="1일 횟수 늘리기">+</button>
</div>

<style>
  .stepper {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-body);
  }

  .label {
    min-width: 6em;
    color: var(--color-ink);
  }

  button {
    width: var(--touch-min);
    height: var(--touch-min);
    font: inherit;
    font-size: 22px;
    color: var(--color-ink);
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-medium);
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: var(--color-sunken);
  }

  button:disabled {
    opacity: 0.38;
    cursor: default;
  }

  output {
    min-width: 3em;
    text-align: center;
    font-size: var(--text-title);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
</style>
