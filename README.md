# Yak-Allim-Landing

> **Yak-Allim(약올림)**: 복약 안내서 OCR 분석 기반 복약 관리 솔루션의 랜딩 페이지

[Svelte 5](https://svelte.dev)와 [Vite](https://vite.dev)로 만든 한 페이지짜리 정적 사이트입니다.
GitHub Pages(`https://koolunkle-yak-allim.github.io/yak-allim-landing/`)에 배포합니다.

## 실행

Node.js 22.12 이상이 필요합니다(vitest 5 기준).

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173/yak-allim-landing/)
npm run build    # dist/에 정적 파일 생성 (프리렌더링 포함)
npm run preview  # 빌드 결과 미리 보기
npm run check    # svelte-check로 .svelte·.js 검사
npm test         # vitest 단위 테스트
```

`src/lib/alarm.test.js`는 앱의 `AlarmFormDefaultsTest.kt`와 같은 사례로 `alarm.js`를 검사합니다.

### 빌드 단계

`npm run build`는 네 단계로 돕니다.

1. `vite build`: 브라우저용 JS·CSS·이미지를 `dist/`에 만듭니다.
2. `vite build --ssr src/entry-server.js --outDir dist-server`: `App`을 HTML 문자열로 그리는 모듈을 만듭니다.
3. `node scripts/prerender.js`: 2의 결과를 `dist/index.html`의 `<div id="app">` 안에 넣고 `dist-server/`를 지웁니다.
4. `node scripts/subset-font.js`: HTML과 JS·CSS 번들에 나온 글자만 담은 Pretendard 가변 글꼴(굵기 400~800)을 만들고,
   `@font-face`와 preload를 `dist/index.html`에 넣습니다.

글꼴은 빌드마다 다시 만들어지므로 문구를 바꿔도 따로 할 일이 없습니다. 다만 페이지 코드에 없는데 브라우저가 Pretendard로 그리는 글자
(time 입력의 "오전·오후" 등)는 `subset-font.js`의 `BROWSER_TEXT`에 적어 둡니다. 개발 서버는 Pretendard의 글자 범위별 CSS를 그대로 씁니다.

브라우저에서는 `main.js`가 미리 그려진 HTML에 `hydrate`로 이벤트만 연결합니다. 개발 서버는 `#app`이 비어 있어 `mount`로 처음부터 그립니다.
그래서 컴포넌트가 처음 그릴 때는 `window`·`document`·`localStorage`·오늘 날짜를 읽지 않고, `$effect` 안에서 읽습니다(`ThemeToggle`, `AlarmDemo` 참고).

## 페이지 구성

`App.svelte`가 상단바 아래에 섹션을 이 순서로 놓습니다.

| 섹션 | 컴포넌트 | 내용 |
| --- | --- | --- |
| 첫 화면 | `Hero` | 소개 문구, 약 봉투 표기 예시, GitHub·`DESIGN.md` 링크, 분석 결과 화면 |
| 사용 흐름 | `HowItWorks` | 사진 찍기 → 확인하기 → 알람 켜기, 단계마다 앱 화면 |
| 안전 설계 | `Safety` | "확인 필요", 표 빈 칸 처리, 실행 취소, 재부팅 후 복구 |
| 알람 데모 | `AlarmDemo` | 1회 복용량이 빈 약으로 시작해, 값을 정해야 알람을 켤 수 있는 설정 시트 |
| 디자인 원칙 | `DesignPrinciples` | 앱 화면이 지키는 원칙 3가지와 근거(강조색 대비 수치 포함), 확인한 접근성 기준 |
| 기술 구조 | `TechStack` | 앱·서버·분석·배포 구성과 저장소 링크 |

## 폴더 구조

```text
index.html              메타 태그(설명, Open Graph), favicon, 저장된 테마를 먼저 적용하는 스크립트
public/                 favicon, apple-touch-icon, 공유 카드 og.png (그대로 복사, base 경로 자동 부여)
scripts/
  prerender.js          서버 빌드 결과로 dist/index.html에 App HTML을 넣음
  subset-font.js        페이지에 쓰인 글자만 담은 Pretendard woff2를 만들어 연결
src/
  main.js               app.css를 불러오고 미리 그린 HTML에 App을 hydrate (개발 서버에서만 Pretendard CSS)
  entry-server.js       빌드 때 svelte/server의 render로 App을 HTML로 그림
  app.css               DESIGN.md의 색·글자·간격·모서리 토큰, 라이트·다크 테마
  App.svelte            상단바, 섹션 배치, footer
  assets/screens/       시연용 안내서로 찍은 앱 화면, 화면마다 360·600·720px WebP
  lib/
    sections/           페이지 섹션 컴포넌트 (위 표)
    Stepper.svelte      −/+ 스테퍼, 값이 null이면 "선택" 표시
    ThemeToggle.svelte  라이트·다크 전환 버튼, 아이콘은 CSS가 현재 테마로 고름
    PhoneFrame.svelte   앱 화면을 감싸는 폰 테두리, srcset·sizes로 맞는 크기만 받음
    screens.js          screen(이름)으로 폭별 WebP를 srcset으로 묶음
    StepCard.svelte     사용 흐름 단계 카드
    FeatureCard.svelte  안전 설계 카드
    alarm.js            앱 AlarmFormDefaults.kt의 알람 규칙을 옮긴 함수
    alarm.test.js       alarm.js 단위 테스트
```

- 색과 간격은 `app.css`의 CSS 변수만 씁니다. 값을 바꿀 때는 앱의 `DESIGN.md`와 함께 맞춥니다.
- 알람 규칙을 바꿀 때는 앱의 `AlarmFormDefaults.kt`와 `alarm.js`, 두 테스트 파일을 같이 고칩니다.
- `public/`의 아이콘과 `og.png`는 앱의 `ic_launcher_foreground`(캡슐)로 만들었습니다.

## 배포

PR마다 `.github/workflows/ci.yml`이 검사, 테스트, 빌드를 돌립니다.
`main`에 푸시하면 `.github/workflows/deploy.yml`이 같은 검사를 거친 뒤 `npm run build` 결과(`dist/`)를 GitHub Pages에 올립니다.
Actions 탭에서 수동으로 실행할 수도 있습니다. 저장소 설정의 Pages Source는 GitHub Actions여야 합니다.

## 관련 저장소

- [yak-allim-android](https://github.com/koolunkle-yak-allim/yak-allim-android): Android 앱, 디자인 기준 문서 `DESIGN.md`
- [yak-allim-server](https://github.com/koolunkle-yak-allim/yak-allim-server): Spring Boot 서버
- [yak-allim-infra](https://github.com/koolunkle-yak-allim/yak-allim-infra): Nginx, Jenkins, n8n
