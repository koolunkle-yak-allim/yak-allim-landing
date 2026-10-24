<script>
  import PhoneFrame from '../PhoneFrame.svelte';
  import resultImage from '../../assets/screens/result.jpg';

  // 약 봉투 표기 순서 그대로 보여 주는 예시
  const dosage = [
    { label: '1회', value: '1정' },
    { label: '1일', value: '3회' },
    { label: '', value: '5일분' },
  ];
  // 화면 읽기 프로그램용 문장. 보이는 표기는 글자가 붙어 "1회1정"처럼 읽혀서 따로 둔다.
  const dosageText = dosage.map((item) => `${item.label} ${item.value}`.trim()).join(', ');
</script>

<section class="hero">
  <div class="text">
    <span class="eyebrow">복약 안내서 사진으로 맞추는 복약 알람</span>
    <h1>약 봉투처럼 정확하고 또렷하게</h1>
    <p class="lead">
      약국에서 받은 복약 안내서를 찍으면 약마다 복용 정보를 정리하고 알람을 맞춰 드려요. 사진에 없는 값은 지어내지
      않고 직접 확인하도록 비워 둡니다.
    </p>
    <p class="dose">
      <span class="sr-only">{dosageText}</span>
      {#each dosage as item}
        <span aria-hidden="true"><em>{item.label}</em><b>{item.value}</b></span>
      {/each}
    </p>
    <div class="actions">
      <a class="button primary" href="https://github.com/koolunkle-yak-allim">GitHub에서 보기</a>
      <a class="button" href="https://github.com/koolunkle-yak-allim/yak-allim-android/blob/main/DESIGN.md">디자인 시스템</a>
    </div>
  </div>
  <div class="visual">
    <PhoneFrame src={resultImage} alt="분석 결과 화면: 약 3개를 찾았어요, 알람 0/3개 켜짐, 확인 필요 1개" />
  </div>
</section>

<style>
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-12);
    align-items: center;
  }

  @media (min-width: 760px) {
    .hero {
      grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .eyebrow {
    font-size: var(--text-label);
    font-weight: 700;
    color: var(--color-primary);
  }

  h1 {
    font-size: var(--text-hero);
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .lead {
    font-size: 18px;
    color: var(--color-ink-muted);
    max-width: 46ch;
  }

  .dose {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-5);
    width: fit-content;
    max-width: 100%;
    padding: var(--space-3) var(--space-5);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-medium);
    background: var(--color-surface);
    font-size: 18px;
  }

  .dose span {
    display: inline-flex;
    gap: var(--space-1);
    align-items: baseline;
  }

  .dose em {
    font-style: normal;
    font-size: var(--text-body-small);
    color: var(--color-ink-muted);
  }

  .dose b {
    font-variant-numeric: tabular-nums;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .button {
    display: inline-flex;
    align-items: center;
    min-height: var(--touch-min);
    padding: 0 var(--space-5);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-medium);
    color: var(--color-ink);
    font-weight: 700;
    text-decoration: none;
  }

  .button.primary {
    border-color: transparent;
    background: var(--color-primary);
    color: var(--color-on-primary);
  }

  .visual {
    justify-self: center;
    width: min(100%, 300px);
  }
</style>
