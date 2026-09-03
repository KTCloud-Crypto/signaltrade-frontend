# SignalTrade Frontend

사용자에게 모의·실전 투자 화면을 제공하는 React·Vite 웹 저장소입니다.

```text
src/api/         Backend API 호출
src/components/  공통 화면 구성요소
src/pages/       화면별 페이지
src/hooks/       공통 상태·polling
public/          정적 파일
```

브라우저는 `/api`를 통해 Identity, Strategy, Trading, Portfolio API를 호출합니다. 로컬에서는 kind Ingress가 API를 연결하고, 운영에서는 빌드 결과물을 S3·CloudFront로 배포합니다.

검사는 `npm run lint`, 빌드는 `npm run build`를 사용합니다.
