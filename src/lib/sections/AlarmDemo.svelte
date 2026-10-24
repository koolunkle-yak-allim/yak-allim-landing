<script>
  import Stepper from '../Stepper.svelte';
  import {
    AMOUNT,
    FREQUENCY,
    DURATION,
    formatAmount,
    defaultTimes,
    resizeTimes,
    isAlarmReady,
    timeOfDay,
    dateRange,
  } from '../alarm.js';

  // 시연용 안내서의 뮤코펙트정: 1회 투약량 칸이 비어 있어 앱도 "선택"으로 비워 둔다.
  const INITIAL = { amount: null, frequency: 2, duration: 5 };

  let amount = $state(INITIAL.amount);
  let frequency = $state(INITIAL.frequency);
  let duration = $state(INITIAL.duration);
  let times = $state(defaultTimes(INITIAL.frequency));
  let isOn = $state(false);

  // 위 값에서 계산되는 값. 원래 값이 바뀌면 자동으로 다시 계산된다.
  const hasEmptyTime = $derived(times.includes(''));
  const canTurnOn = $derived(isAlarmReady(amount, times));
  const period = $derived(dateRange(duration));
  const summary = $derived(
    `1회 ${amount === null ? '?' : `${formatAmount(amount)}정`} · 1일 ${frequency}회 · ${duration}일분`,
  );

  function setAmount(next) {
    amount = next;
    isOn = false;
  }

  function setFrequency(next) {
    frequency = next;
    times = resizeTimes(times, next);
    isOn = false;
  }

  function setDuration(next) {
    duration = next;
    isOn = false;
  }

  function reset() {
    amount = INITIAL.amount;
    frequency = INITIAL.frequency;
    duration = INITIAL.duration;
    times = defaultTimes(INITIAL.frequency);
    isOn = false;
  }
</script>

<section class="demo" aria-labelledby="demo-title">
  <div class="head">
    <h2 id="demo-title">직접 해 보세요</h2>
    <p>시연용 안내서에서 1회 복용량 칸이 비어 있던 약입니다. 값을 정해야 알람을 켤 수 있어요.</p>
  </div>

  <div class="layout">
    <div class="sheet">
      <h3>뮤코펙트정</h3>

      {#if amount === null}
        <p class="hint">사진에 없어 비워 둔 값이 있어요. 약 봉투를 보고 직접 정해 주세요.</p>
      {:else if hasEmptyTime}
        <p class="hint">비어 있는 복용 시각이 있어요. 알람이 울릴 시각을 정해 주세요.</p>
      {/if}

      <div class="group">
        <span class="group-title">복용 정보</span>
        <Stepper
          label="1회 복용량"
          value={amount}
          min={AMOUNT.min}
          max={AMOUNT.max}
          step={AMOUNT.step}
          start={1}
          format={(v) => `${formatAmount(v)}정`}
          onchange={setAmount}
        />
        <Stepper
          label="1일 횟수"
          value={frequency}
          min={FREQUENCY.min}
          max={FREQUENCY.max}
          format={(v) => `${v}회`}
          onchange={setFrequency}
        />
        <Stepper
          label="복용 기간"
          value={duration}
          min={DURATION.min}
          max={DURATION.max}
          format={(v) => `${v}일`}
          onchange={setDuration}
        />
        <p class="period">{period}</p>
      </div>

      <div class="group">
        <span class="group-title">복용 시각 · 하루 {frequency}번</span>
        <div class="times">
          {#each times as time, index (index)}
            <label class="time" class:empty={time === ''}>
              <span>{time === '' ? '선택' : timeOfDay(time)}</span>
              <input type="time" bind:value={times[index]} oninput={() => (isOn = false)} />
            </label>
          {/each}
        </div>
      </div>

      <button type="button" class="primary" disabled={!canTurnOn} onclick={() => (isOn = true)}>알람 켜기</button>
    </div>

    <div class="result" aria-live="polite">
      {#if isOn}
        <div class="card">
          <div class="card-head">
            <strong>뮤코펙트정</strong>
            <span class="chip on">알람 켜짐</span>
          </div>
          <p class="spec">{summary}</p>
          <p class="muted">알람 {times.join(' · ')}</p>
          <p class="muted">{period}</p>
        </div>
        <p class="note">웹 데모라 실제 알람은 울리지 않아요.</p>
        <button type="button" class="secondary" onclick={reset}>처음부터 다시</button>
      {:else}
        <div class="card">
          <div class="card-head">
            <strong>뮤코펙트정</strong>
            {#if canTurnOn}
              <span class="chip off">알람 꺼짐</span>
            {:else}
              <span class="chip warn">확인 필요</span>
            {/if}
          </div>
          <p class="spec">{summary}</p>
        </div>
        <p class="note">값을 바꾸면 카드가 바로 따라 바뀝니다.</p>
      {/if}
    </div>
  </div>
</section>

<style>
  .demo {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  h2 {
    font-size: 28px;
    font-weight: 800;
  }

  .head p,
  .muted,
  .note,
  .period {
    color: var(--color-ink-muted);
  }

  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
    align-items: start;
  }

  @media (min-width: 760px) {
    .layout {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    }
  }

  .sheet {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding: var(--space-6);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-xlarge);
    background: var(--color-surface);
  }

  h3 {
    font-size: var(--text-title);
    font-weight: 700;
  }

  .hint {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-medium);
    background: var(--color-warning-soft);
    color: var(--color-warning);
    font-size: var(--text-body-small);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .group-title {
    font-size: var(--text-body-small);
    font-weight: 700;
    color: var(--color-ink-muted);
  }

  .period {
    font-size: var(--text-body-small);
  }

  .times {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
    gap: var(--space-2);
  }

  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-medium);
    font-size: var(--text-caption);
    font-weight: 600;
    color: var(--color-ink-muted);
  }

  .time.empty {
    border-color: var(--color-warning);
    color: var(--color-warning);
  }

  .time input {
    width: 100%;
    min-width: 0;
    font: inherit;
    font-size: var(--text-subtitle);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--color-primary);
    background: transparent;
    border: none;
  }

  button.primary,
  button.secondary {
    min-height: 52px;
    font: inherit;
    font-weight: 700;
    border-radius: var(--radius-medium);
    cursor: pointer;
  }

  button.primary {
    border: none;
    background: var(--color-primary);
    color: var(--color-on-primary);
  }

  button.primary:disabled {
    background: var(--color-sunken);
    color: var(--color-ink-muted);
    cursor: default;
  }

  button.secondary {
    border: 1px solid var(--color-line);
    background: var(--color-surface);
    color: var(--color-ink);
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-5);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-large);
    background: var(--color-surface);
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
  }

  .card-head strong {
    font-size: var(--text-subtitle);
  }

  .spec {
    font-size: var(--text-body);
    font-variant-numeric: tabular-nums;
  }

  .chip {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-caption);
    font-weight: 700;
    white-space: nowrap;
  }

  .chip.on {
    background: var(--color-success-soft);
    color: var(--color-success);
  }

  .chip.off {
    background: var(--color-sunken);
    color: var(--color-ink-muted);
  }

  .chip.warn {
    background: var(--color-warning-soft);
    color: var(--color-warning);
  }

  .note {
    font-size: var(--text-body-small);
  }
</style>
