<script>
  // 라이트·다크를 직접 고르는 버튼. 고른 값은 <html data-theme>와 localStorage에 남기고,
  // 고른 적이 없으면 기기 설정(prefers-color-scheme)을 따른다. 처음 그릴 때의 적용은 index.html의 인라인 스크립트가 한다.
  const KEY = 'theme';
  const CANVAS = { light: '#F6F8F9', dark: '#11181C' };
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;

  let theme = $state(root.dataset.theme ?? (media.matches ? 'dark' : 'light'));
  const isDark = $derived(theme === 'dark');

  // 브라우저 주소창 색도 고른 테마에 맞춘다.
  function syncThemeColor() {
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute('content', CANVAS[theme]);
    }
  }

  function toggle() {
    theme = isDark ? 'light' : 'dark';
    root.dataset.theme = theme;
    syncThemeColor();
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // 저장소를 막은 브라우저에서는 이번 방문 동안만 유지한다.
    }
  }

  $effect(() => {
    if (root.dataset.theme) syncThemeColor();

    // 직접 고른 적이 없을 때만 기기 설정 변화를 따라간다.
    const follow = (/** @type {MediaQueryListEvent} */ event) => {
      if (!root.dataset.theme) theme = event.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', follow);
    return () => media.removeEventListener('change', follow);
  });
</script>

<button type="button" onclick={toggle} aria-label={isDark ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'}>
  {#if isDark}
    <!-- 해: 누르면 라이트 -->
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  {:else}
    <!-- 달: 누르면 다크 -->
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {/if}
</button>

<style>
  button {
    display: grid;
    place-items: center;
    width: var(--touch-min);
    height: var(--touch-min);
    padding: 0;
    color: var(--color-ink);
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius-medium);
    cursor: pointer;
  }

  button:hover {
    background: var(--color-sunken);
  }

  svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
