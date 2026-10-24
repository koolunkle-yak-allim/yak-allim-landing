<script>
  import PhoneFrame from './PhoneFrame.svelte';

  let { number, title, body, image, imageAlt } = $props();
</script>

<article class="step">
  <div class="frame">
    <!-- .frame 최대 240px에서 PhoneFrame 테두리 12px을 뺀 폭 -->
    <PhoneFrame {image} alt={imageAlt} sizes="228px" />
  </div>
  <span class="number">{number}</span>
  <h3>{title}</h3>
  <p>{body}</p>
</article>

<style>
  .step {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .frame {
    max-width: 240px;
    margin-bottom: var(--space-2);
  }

  .number {
    font-size: var(--text-label);
    font-weight: 700;
    color: var(--color-primary);
    font-variant-numeric: tabular-nums;
  }

  h3 {
    font-size: var(--text-title);
    font-weight: 700;
  }

  p {
    color: var(--color-ink-muted);
  }
</style>
