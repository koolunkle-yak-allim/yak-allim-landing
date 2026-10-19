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
    gap: 12px;
    font-family: system-ui, sans-serif;
    font-size: 18px;
  }
  .label {
    min-width: 6em;
  }
  button {
    width: 48px;
    height: 48px;
    font-size: 22px;
    border: 1px solid #dde4e8;
    border-radius: 12px;
    background: #ffffff;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.38;
    cursor: default;
  }
  output {
    min-width: 3em;
    text-align: center;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
</style>
