<script>
  // 앱 화면 캡처를 휴대폰 틀에 넣어 보여 준다. 크기는 부모가 정하고, sizes로 표시 폭을 알려 맞는 파일을 고르게 한다.
  // 첫 화면처럼 바로 보이는 이미지는 priority로 지연 로딩을 끈다. fetchpriority="high"는 Lighthouse 측정에서
  // 첫 화면 표시(FCP)를 늦춰 넣지 않았다.
  /**
   * @type {{ image: { src: string, srcset: string }, alt: string, sizes: string, priority?: boolean }}
   */
  let { image, alt, sizes, priority = false } = $props();
</script>

<div class="phone">
  <img
    src={image.src}
    srcset={image.srcset}
    {sizes}
    {alt}
    width="720"
    height="1435"
    loading={priority ? 'eager' : 'lazy'}
  />
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
    height: auto;
    aspect-ratio: 720 / 1435;
    object-fit: cover;
    border-radius: 22px;
  }
</style>
