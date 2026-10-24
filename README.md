# Yak-Allim-Landing

> **Yak-Allim(약올림)**: 복약 안내서 OCR 분석 기반 복약 관리 솔루션의 랜딩 페이지

[Svelte 5](https://svelte.dev)와 [Vite](https://vite.dev)로 만든 한 페이지짜리 정적 사이트입니다.
GitHub Pages(`https://koolunkle-yak-allim.github.io/yak-allim-landing/`)에 배포합니다.

## 실행

Node.js 22.12 이상이 필요합니다(vitest 5 기준).

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173/yak-allim-landing/)
npm run build    # dist/에 정적 파일 생성
npm run preview  # 빌드 결과 미리 보기
npm run check    # svelte-check로 .svelte·.js 검사
npm test         # vitest 단위 테스트
```

`src/lib/alarm.test.js`는 앱의 `AlarmFormDefaultsTest.kt`와 같은 사례로 `alarm.js`를 검사합니다.

## 배포

PR마다 `.github/workflows/ci.yml`이 검사, 테스트, 빌드를 돌립니다.
`main`에 푸시하면 `.github/workflows/deploy.yml`이 같은 검사를 거친 뒤 `npm run build` 결과(`dist/`)를 GitHub Pages에 올립니다.
Actions 탭에서 수동으로 실행할 수도 있습니다. 저장소 설정의 Pages Source는 GitHub Actions여야 합니다.

## 관련 저장소

- [yak-allim-android](https://github.com/koolunkle-yak-allim/yak-allim-android): Android 앱, 디자인 기준 문서 `DESIGN.md`
- [yak-allim-server](https://github.com/koolunkle-yak-allim/yak-allim-server): Spring Boot 서버
- [yak-allim-infra](https://github.com/koolunkle-yak-allim/yak-allim-infra): Nginx, Jenkins, n8n
