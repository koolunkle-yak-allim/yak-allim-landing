<script>
  const GITHUB = 'https://github.com/koolunkle-yak-allim';

  const parts = [
    { name: 'Android 앱', stack: ['Kotlin', 'Jetpack Compose', 'Hilt', 'CameraX', 'AlarmManager'], repo: 'yak-allim-android' },
    { name: '서버', stack: ['Spring Boot(Kotlin)', 'SSE 진행률', 'FCM 알림'], repo: 'yak-allim-server' },
    { name: '분석', stack: ['n8n', 'Upstage OCR', 'Gemini'], repo: 'yak-allim-infra' },
    { name: '배포', stack: ['Docker', 'Nginx 블루-그린', 'Jenkins', 'GitHub Actions'], repo: 'yak-allim-infra' },
  ];
</script>

<section class="tech" aria-labelledby="tech-title">
  <div class="head">
    <h2 id="tech-title">앱부터 배포까지 직접 만들었습니다</h2>
    <p>분석 요청은 바로 접수하고, 진행 상황은 실시간으로, 완료는 알림으로 전합니다.</p>
  </div>
  <dl class="list">
    {#each parts as part (part.name)}
      <div class="row">
        <dt>{part.name}</dt>
        <dd>
          <span class="stack">
            <!-- 가운뎃점은 앞 항목에 붙여, 줄이 바뀌어도 줄 맨 앞에 오지 않게 한다. -->
            {#each part.stack as item, index (item)}
              <span class="item">{item}{index < part.stack.length - 1 ? ' ·' : ''}</span>{' '}
            {/each}
          </span>
          <a href="{GITHUB}/{part.repo}">{part.repo}</a>
        </dd>
      </div>
    {/each}
  </dl>
</section>

<style>
  .tech {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
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

  .head p {
    color: var(--color-ink-muted);
  }

  .list {
    margin: 0;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-large);
    background: var(--color-surface);
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
      grid-template-columns: 8em minmax(0, 1fr);
      gap: var(--space-4);
    }
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-3);
    color: var(--color-ink-muted);
  }

  .item {
    white-space: nowrap;
  }

  a {
    color: var(--color-primary);
    font-weight: 600;
  }
</style>
