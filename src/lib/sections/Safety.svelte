<script>
  import FeatureCard from '../FeatureCard.svelte';

  const features = [
    {
      title: '없는 값은 "확인 필요"',
      body:
        '사진에 숫자가 없으면 지어내지 않고 비워 둡니다. 직접 정하기 전에는 알람을 켤 수 없습니다. 투약 정보가 없는 사진에서 AI가 "1정 · 1회 · 1일"을 채우던 문제를 이렇게 막았습니다.',
      tone: 'warning',
    },
    {
      title: '표의 빈 칸에도 정확하게',
      body: '숫자를 순서가 아니라 사진 속 위치로 열에 맞춰, 빈 칸 때문에 값이 밀리지 않습니다. 빈 칸이 있는 표 5종을 15번 실행해 모두 기대값과 같았습니다.',
    },
    {
      title: '되돌릴 수 있는 끄기',
      body: '확인 없이 바로 실행되던 눈에 띄는 "알람 해제" 버튼을 없앴습니다. 끄기는 시트 안에 두고, 끈 뒤 10초 동안 실행 취소로 되돌릴 수 있습니다.',
    },
    {
      title: '재부팅해도 그대로',
      body: '휴대폰을 다시 켜도 알람을 다시 등록하고, 복용 기간이 끝난 알람은 정리합니다.',
    },
  ];
</script>

<section class="safety" aria-labelledby="safety-title">
  <div class="head">
    <h2 id="safety-title">틀린 용량은 빈&nbsp;값보다 위험하니까</h2>
    <p>AI가 읽은 값을 그대로 믿지 않도록 만들었습니다.</p>
  </div>
  <div class="grid">
    {#each features as feature (feature.title)}
      <FeatureCard {...feature} />
    {/each}
  </div>
</section>

<style>
  .safety {
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

  .head p {
    color: var(--color-ink-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
