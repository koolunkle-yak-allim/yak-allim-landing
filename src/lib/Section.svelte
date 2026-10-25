<script>
  // 페이지 섹션의 공통 틀: 제목(h2)과 한 줄 소개, 그 아래 본문. 본문은 부모가 태그 사이에 쓴 내용(children)을 그린다.
  // 제목 id는 `${id}-title`이 되고, section이 aria-labelledby로 가리켜 화면 읽기 프로그램이 섹션 이름으로 읽는다.
  /**
   * @type {{ id: string, title: string, lead?: string, children: import('svelte').Snippet }}
   */
  let { id, title, lead, children } = $props();
</script>

<section aria-labelledby="{id}-title">
  <div class="head">
    <h2 id="{id}-title">{title}</h2>
    {#if lead}
      <p>{lead}</p>
    {/if}
  </div>
  {@render children()}
</section>

<style>
  section {
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

  p {
    color: var(--color-ink-muted);
  }
</style>
