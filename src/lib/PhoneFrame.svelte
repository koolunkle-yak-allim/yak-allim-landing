<script>
  // 앱 화면 캡처를 휴대폰 틀에 넣어 보여 준다. 크기는 부모가 정한다.
  let { src, alt } = $props();
</script>

<div class="phone">
  <img {src} {alt} loading="lazy" />
</div>

<style>
  .phone {
    width: 100%;
    padding: 6px;
    border-radius: 28px;
    background: var(--color-ink);
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 720 / 1435;
    object-fit: cover;
    border-radius: 22px;
  }
</style>
