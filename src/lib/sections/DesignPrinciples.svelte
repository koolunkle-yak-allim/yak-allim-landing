<script>
  import Section from '../Section.svelte';
  // 앱 화면이 지키는 디자인 원칙과 그 근거. 이전 버전과 비교하지 않고 지금 제품이 지키는 기준만 말한다.
  // 없는 값 처리와 끄기 버튼은 Safety 섹션이 다룬다. 색·글자·간격 규칙은 앱의 DESIGN.md를 기준으로 한다.
  const DESIGN_MD = 'https://github.com/koolunkle-yak-allim/yak-allim-android/blob/main/DESIGN.md';

  // 앱의 강조색 견본. 라이트는 주 버튼(흰 글자), 다크는 어두운 면 위의 청록 글자다. 두 테마 모두 같은 색으로 보여 준다.
  const swatches = [
    { theme: '라이트', label: '분석 시작', background: '#0A6F73', color: '#FFFFFF', ratio: '5.94' },
    { theme: '다크', label: '분석 시작', background: '#1A2329', color: '#4FC3C0', ratio: '7.52' },
  ];

  const principles = [
    {
      title: '어디서나 읽히는 강조색',
      body: '강조색은 저채도 청록 한 가지만 씁니다. 버튼의 흰 글자도, 어두운 화면의 청록 글자도 또렷하게 읽힙니다.',
      evidence: 'WCAG 글자 대비 4.5:1 기준. 라이트 5.94:1, 다크 7.52:1.',
      swatches: true,
    },
    {
      title: '잘못된 값을 만들 수 없는 입력',
      body: '복용량·횟수·기간은 스테퍼로, 시각은 칩과 TimePicker로 고릅니다. 직접 타이핑하지 않으니 25시 같은 값이 생기지 않습니다.',
      evidence: '값을 하나씩 따로 묻지 않고, 바텀시트 한 화면에서 함께 고칩니다.',
    },
    {
      title: '할 일이 먼저 보이는 결과 화면',
      body: '"약 3개를 찾았어요 · 알람 0/3개 켜짐 · 확인 필요 1개" 요약이 가장 먼저 보이고, 원본 사진은 한 줄 썸네일로 접혀 있습니다.',
      evidence: '사용자가 할 일(확인·입력)이 먼저입니다. 사진은 약 봉투와 대조할 때만 열어 봅니다.',
    },
  ];

  const criteria = [
    { name: '글자 대비 4.5:1 이상', result: '주 버튼 5.94, 상태 칩 4.76~4.94, 스낵바 동작 글자 7.51(다크 4.98)' },
    { name: '터치 영역 48dp', result: '모든 버튼 48dp 이상, 주 버튼 52dp' },
    { name: '글자 크기 200%', result: '글자를 감싸는 요소에 고정 높이 대신 최소 높이만' },
    { name: '색만으로 구분하지 않기', result: '켜짐·꺼짐·확인 필요를 칩 글자로도 표시' },
    { name: '애니메이션 줄이기', result: '시스템 설정이 켜져 있으면 분석 중 애니메이션 대신 정지 아이콘' },
    { name: '스크린 리더', result: '스테퍼와 시각 칩에 "1회 복용량 늘리기" 같은 설명' },
  ];
</script>

<Section
  id="design"
  title="기준을 정하고, 재서 확인했습니다"
  lead="보기 좋은지가 아니라 측정할 수 있는 기준으로 화면을 정했습니다."
>

  <div class="principles">
    {#each principles as principle (principle.title)}
      <article class="principle">
        <h3>{principle.title}</h3>
        {#if principle.swatches}
          <ul class="swatches" aria-label="앱 강조색의 글자 대비">
            {#each swatches as swatch (swatch.theme)}
              <li>
                <span class="swatch" style:background={swatch.background} style:color={swatch.color}>{swatch.label}</span>
                <span class="ratio">{swatch.theme} {swatch.ratio} : 1</span>
              </li>
            {/each}
          </ul>
        {/if}
        <p>{principle.body}</p>
        <p class="evidence"><strong>근거</strong> {principle.evidence}</p>
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
</Section>

<style>
  h3 {
    font-size: var(--text-subtitle);
    font-weight: 700;
  }

  .more,
  .evidence {
    color: var(--color-ink-muted);
  }

  .principles {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }

  @media (min-width: 900px) {
    .principles {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .principle {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-6);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-large);
    background: var(--color-surface);
    min-width: 0;
  }

  .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
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

  /* 견본은 테마와 상관없이 앱의 실제 색 조합을 보여 준다. 다크 견본은 밝은 화면에서도 보이게 테두리를 둔다. */
  .swatch {
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-medium);
    font-size: var(--text-body-small);
    font-weight: 700;
    white-space: nowrap;
  }

  .ratio {
    font-size: var(--text-caption);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--color-success);
  }

  .principle p {
    font-size: var(--text-body-small);
  }

  .evidence strong {
    margin-right: var(--space-1);
    color: var(--color-ink);
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
