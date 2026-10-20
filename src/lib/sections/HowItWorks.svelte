<script>
  import StepCard from '../StepCard.svelte';
  import homeImage from '../../assets/screens/home.jpg';
  import sheetImage from '../../assets/screens/sheet-missing.jpg';
  import alarmImage from '../../assets/screens/alarm-on.jpg';

  const steps = [
    {
      title: '사진 찍기',
      body: '약국에서 받은 복약 안내서를 찍거나 갤러리에서 고릅니다.',
      image: homeImage,
      imageAlt: '홈 화면: 복약 안내서 사진을 고른 상태',
    },
    {
      title: '확인하기',
      body: '약마다 1회 복용량·하루 횟수·복용 기간이 정리됩니다. 사진에 없는 값은 비워 두고 직접 정합니다.',
      image: sheetImage,
      imageAlt: '알람 설정 화면: 1회 복용량이 선택으로 비어 있음',
    },
    {
      title: '알람 켜기',
      body: '횟수에 맞춘 시각(아침·점심·저녁·취침 전)을 확인하고 켜면, 정해진 시각에 알려 줍니다.',
      image: alarmImage,
      imageAlt: '알람이 켜진 약 카드와 알람을 켰어요 안내',
    },
  ];
</script>

<section class="how" aria-labelledby="how-title">
  <h2 id="how-title">사진 한 장에서 알람까지</h2>
  <div class="steps">
    {#each steps as step, index (step.title)}
      <StepCard number={index + 1} {...step} />
    {/each}
  </div>
</section>

<style>
  .how {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  h2 {
    font-size: 28px;
    font-weight: 800;
  }

  .steps {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-8);
  }

  @media (min-width: 760px) {
    .steps {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
