<script>
  // 앱의 알람 설정 시트에 있는 스테퍼. value가 null이면 아직 정하지 않은 값이라 "선택"을 주의 색으로 보여 주고,
  // −/+ 어느 쪽을 눌러도 start 값부터 시작한다. 바뀐 값은 onchange로 부모에게 알린다.
  /**
   * @type {{
   *   label: string, value: number | null, min: number, max: number, step?: number, start?: number,
   *   format?: (value: number) => string, onchange: (value: number) => void,
   * }}
   */
  let { label, value, min, max, step = 1, start = min, format = String, onchange } = $props();

  const isEmpty = $derived(value === null);
  const canDecrease = $derived(isEmpty || value > min);
  const canIncrease = $derived(isEmpty || value < max);

  function change(direction) {
    if (isEmpty) {
      onchange(start);
      return;
    }
    onchange(Math.min(max, Math.max(min, value + step * direction)));
  }
</script>

<div class="stepper">
  <span class="label">{label}</span>
  <button type="button" onclick={() => change(-1)} disabled={!canDecrease} aria-label="{label} 줄이기">−</button>
  <output class:empty={isEmpty}>{isEmpty ? '선택' : format(value)}</output>
  <button type="button" onclick={() => change(1)} disabled={!canIncrease} aria-label="{label} 늘리기">+</button>
</div>

<style>
  .stepper {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .label {
    flex: 1;
    min-width: 0;
    color: var(--color-ink);
  }

  button {
    width: var(--touch-min);
    height: var(--touch-min);
    flex: none;
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
    width: 4.5em;
    text-align: center;
    font-size: var(--text-title);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  output.empty {
    color: var(--color-warning);
  }
</style>
