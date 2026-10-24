<script>
  // 앱 화면을 다시 설계하며 고친 문제와 근거. 예전 yak-allim-design 페이지에서 랜딩과 겹치지 않는 내용만 옮겼다.
  // 없는 값 처리와 끄기 버튼은 Safety 섹션이 다룬다. 색·글자·간격 규칙은 앱의 DESIGN.md를 기준으로 한다.
  const DESIGN_MD = 'https://github.com/koolunkle-yak-allim/yak-allim-android/blob/main/DESIGN.md';

  // 대비 견본의 색은 비교를 보여 주려는 자료라 테마 토큰이 아니라 실제 앱에서 쓴 값을 그대로 쓴다.
  const swatches = [
    { label: '분석 시작', background: '#00ACC1', ratio: '2.74', pass: false },
    { label: '알람 해제', background: '#FF8A65', ratio: '2.31', pass: false },
    { label: '분석 시작', background: '#0A6F73', ratio: '5.94', pass: true },
  ];

  const changes = [
    {
      title: '글자 대비가 기준에 못 미치는 강조색',
      before: '밝은 청록 #00ACC1과 코랄 #FF8A65 위에 흰 글자를 썼습니다.',
      after: '저채도 청록 #0A6F73 한 가지만 강조색으로 씁니다. 다크 모드는 #4FC3C0입니다.',
      reason: 'WCAG 글자 대비 4.5:1 기준. 2.74·2.31에서 5.94(다크 7.52)로 올렸습니다.',
      swatches: true,
    },
    {
      title: '숫자를 직접 입력하는 알람 대화상자',
      before: '대화상자의 좁은 칸에 시·분을 직접 입력했고, 잘못된 값은 확인을 누른 뒤에야 토스트로 알렸습니다.',
      after: '바텀시트 한 곳에서 복용량·횟수·기간은 스테퍼로, 시각은 칩과 TimePicker로 고릅니다.',
      reason: '잘못된 값을 아예 만들 수 없게 합니다. 여러 값을 받는 입력은 대화상자가 아니라 시트로 받습니다.',
    },
    {
      title: '첫 화면에 결과가 보이지 않음',
      before: '원본 사진이 화면의 40% 가까이 차지해, 버튼과 안내를 지나야 첫 약 카드가 나왔습니다.',
      after: '"약 3개를 찾았어요 · 알람 0/3개 켜짐 · 확인 필요 1개" 요약을 먼저 두고, 사진은 한 줄 썸네일로 접었습니다.',
      reason: '사용자가 할 일(확인·입력)이 먼저입니다. 사진은 약 봉투와 대조할 때만 열어 봅니다.',
    },
  ];

  const criteria = [
    { name: '글자 대비 4.5:1 이상', result: '주 버튼 5.94, 상태 칩 4.76~4.94, 스낵바 동작 글자 7.51(다크 4.98)' },
    { name: '터치 영역 48dp', result: '36dp이던 버튼을 모두 키우고, 주 버튼은 52dp' },
    { name: '글자 크기 200%', result: '글자를 감싸는 요소에 고정 높이 대신 최소 높이만' },
    { name: '색만으로 구분하지 않기', result: '켜짐·꺼짐·확인 필요를 칩 글자로도 표시' },
    { name: '애니메이션 줄이기', result: '시스템 설정이 켜져 있으면 분석 중 애니메이션 대신 정지 아이콘' },
    { name: '스크린 리더', result: '스테퍼와 시각 칩에 "1회 복용량 늘리기" 같은 설명' },
  ];
</script>

<section class="design" aria-labelledby="design-title">
  <div class="head">
    <h2 id="design-title">바꾼 것과 그 이유</h2>
    <p>이전 앱 화면을 실기기와 코드에서 점검해 문제를 고르고, 각각 측정할 수 있는 기준으로 고쳤습니다.</p>
  </div>

  <div class="changes">
    {#each changes as change (change.title)}
      <article class="change">
        <h3>{change.title}</h3>
        {#if change.swatches}
          <!-- 낮은 대비를 직접 보여 주는 견본이라 글자가 아닌 그림(SVG)으로 그리고, 내용은 aria-label로 전한다.
               같은 수치는 아래 전·후·근거 본문에도 글로 있다. -->
          <ul class="swatches" aria-label="강조색 버튼의 글자 대비, 바꾸기 전 두 개와 바꾼 뒤 한 개">
            {#each swatches as swatch, index (index)}
              <li>
                <svg
                  class="swatch"
                  viewBox="0 0 80 36"
                  role="img"
                  aria-label="{swatch.pass ? '바꾼 뒤' : '바꾸기 전'} {swatch.label} 버튼, 흰 글자 대비 {swatch.ratio}:1"
                >
                  <rect width="80" height="36" rx="10" fill={swatch.background} />
                  <text x="40" y="23" text-anchor="middle">{swatch.label}</text>
                </svg>
                <span class="ratio" class:pass={swatch.pass} aria-hidden="true">
                  {swatch.pass ? '후' : '전'}
                  {swatch.ratio} : 1
                </span>
              </li>
            {/each}
          </ul>
        {/if}
        <dl>
          <dt>전</dt>
          <dd>{change.before}</dd>
          <dt>후</dt>
          <dd>{change.after}</dd>
          <dt>근거</dt>
          <dd>{change.reason}</dd>
        </dl>
      </article>
    {/each}
  </div>

  <div class="criteria">
    <h3>확인한 기준</h3>
    <dl class="list">
      {#each criteria as item (item.name)}
        <div class="row">
          <dt>{item.name}</dt>
          <dd>{item.result}</dd>
        </div>
      {/each}
    </dl>
    <p class="more">
      색·글자·간격 규칙은 앱 저장소의 <a href={DESIGN_MD}>DESIGN.md</a>에 정리되어 있습니다.
    </p>
  </div>
</section>

<style>
  .design {
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

  h3 {
    font-size: var(--text-subtitle);
    font-weight: 700;
  }

  .head p,
  .more {
    color: var(--color-ink-muted);
  }

  .changes {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }

  @media (min-width: 900px) {
    .changes {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .change {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-6);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-large);
    background: var(--color-surface);
    min-width: 0;
  }

  .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .swatches li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
  }

  .swatch {
    display: block;
    width: 80px;
    height: 36px;
  }

  .swatch text {
    fill: #ffffff;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 700;
  }

  .ratio {
    font-size: var(--text-caption);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--color-danger);
  }

  .ratio.pass {
    color: var(--color-success);
  }

  .change dl {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-2) var(--space-3);
    margin: 0;
  }

  .change dt {
    font-size: var(--text-body-small);
    font-weight: 700;
    color: var(--color-ink-muted);
  }

  .change dd {
    margin: 0;
    font-size: var(--text-body-small);
  }

  .criteria {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .list {
    margin: 0;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-large);
    background: var(--color-surface);
    overflow: hidden;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-1);
    padding: var(--space-4) var(--space-5);
    border-top: 1px solid var(--color-line);
  }

  .row:first-child {
    border-top: none;
  }

  @media (min-width: 640px) {
    .row {
      grid-template-columns: 11em minmax(0, 1fr);
      gap: var(--space-4);
    }
  }

  .row dt {
    font-weight: 700;
  }

  .row dd {
    margin: 0;
    color: var(--color-ink-muted);
  }

  .more {
    font-size: var(--text-body-small);
  }

  a {
    color: var(--color-primary);
    font-weight: 600;
  }
</style>
