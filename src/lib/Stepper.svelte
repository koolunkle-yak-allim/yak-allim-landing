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

  // 끝값에서는 disabled 대신 aria-disabled로 막는다. disabled는 누르던 버튼에서 키보드 포커스를 빼앗는다.
  function change(direction) {
    if (direction < 0 ? !canDecrease : !canIncrease) return;
    if (isEmpty) {
      onchange(start);
      return;
    }
    onchange(Math.min(max, Math.max(min, value + step * direction)));
  }
</script>

<div class="stepper">
  <span class="label">{label}</span>
  <div class="controls">
    <button type="button" onclick={() => change(-1)} aria-disabled={!canDecrease} aria-label="{label} 줄이기">−</button>
    <output class:empty={isEmpty}>{isEmpty ? '선택' : format(value)}</output>
    <button type="button" onclick={() => change(1)} aria-disabled={!canIncrease} aria-label="{label} 늘리기">+</button>
  </div>
</div>

<style>
  /* 폭이 좁으면 이름표를 줄이지 않고 −/+ 묶음을 다음 줄 오른쪽으로 내린다. */
  .stepper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
  }

  .label {
    flex: 1 0 auto;
    white-space: nowrap;
    color: var(--color-ink);
  }

  .controls {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-left: auto;
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

  button:hover:not([aria-disabled='true']) {
    background: var(--color-sunken);
  }

  button[aria-disabled='true'] {
    opacity: 0.38;
    cursor: default;
  }

  output {
    width: 3.75em;
    text-align: center;
    font-size: var(--text-title);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  output.empty {
    color: var(--color-warning);
  }
</style>
