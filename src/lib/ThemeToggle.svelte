<script>
  // 라이트·다크를 직접 고르는 버튼. 고른 값은 <html data-theme>와 localStorage에 남기고,
  // 고른 적이 없으면 기기 설정(prefers-color-scheme)을 따른다. 처음 그릴 때의 적용은 index.html의 인라인 스크립트가 한다.
  // 빌드 때 HTML로 미리 그려지므로 window·document는 하이드레이션 뒤($effect)에만 읽는다.
  // 해·달 아이콘은 둘 다 그려 두고 CSS가 현재 테마로 고르므로, 스크립트가 붙기 전에도 맞는 아이콘이 보인다.
  const KEY = 'theme';
  const CANVAS = { light: '#F6F8F9', dark: '#11181C' };

  /** @type {'light' | 'dark' | null} 하이드레이션 전에는 모른다. */
  let theme = $state(null);
  const label = $derived(
    theme === 'dark' ? '라이트 모드로 바꾸기' : theme === 'light' ? '다크 모드로 바꾸기' : '라이트·다크 모드 바꾸기',
  );

  // 브라우저 주소창 색도 고른 테마에 맞춘다.
  function syncThemeColor() {
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute('content', CANVAS[theme]);
    }
  }

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    syncThemeColor();
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // 저장소를 막은 브라우저에서는 이번 방문 동안만 유지한다.
    }
  }

  $effect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    theme = /** @type {'light' | 'dark'} */ (root.dataset.theme) ?? (media.matches ? 'dark' : 'light');
    if (root.dataset.theme) syncThemeColor();

    // 직접 고른 적이 없을 때만 기기 설정 변화를 따라간다.
    const follow = (/** @type {MediaQueryListEvent} */ event) => {
      if (!root.dataset.theme) theme = event.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', follow);
    return () => media.removeEventListener('change', follow);
  });
</script>

<button type="button" onclick={toggle} aria-label={label}>
  <!-- 해: 다크일 때 보이고, 누르면 라이트 -->
  <svg class="sun" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
  <!-- 달: 라이트일 때 보이고, 누르면 다크 -->
  <svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
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

  /* app.css의 테마 규칙과 같은 조건으로 아이콘을 고른다. */
  .sun {
    display: none;
  }

  :global(:root[data-theme='dark']) .sun {
    display: block;
  }

  :global(:root[data-theme='dark']) .moon {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light'])) .sun {
      display: block;
    }

    :global(:root:not([data-theme='light'])) .moon {
      display: none;
    }
  }
</style>
