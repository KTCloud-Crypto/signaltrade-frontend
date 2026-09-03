# SignalTrade Frontend

사용자가 모의·실전 투자 상태를 보고 전략을 설정하는 React·Vite 웹 애플리케이션입니다. 인증, 전략, 주문, 포지션 서비스를 하나의 화면 흐름으로 연결합니다.

## 주요 화면

- 로그인·회원가입·비밀번호 재설정
- 모의투자와 실전투자 대시보드
- 전략 추가, 주문 예산, 분봉, 손절·익절 설정
- 전략 신호, 실행 결과, 거래 내역
- 모의계좌 입출금과 실전 잔고·외부 자산
- Upbit API Key와 Telegram 연결 설정
- 손익·거래 분석과 이용 가이드

## 디렉터리

```text
src/api/         Backend API 호출과 인증 처리
src/components/  대시보드·설정·공통 화면 구성요소
src/pages/       주소별 페이지와 화면 조합
src/hooks/       polling 등 공통 상태 처리
src/utils/       금액·시간·시장 표시 보조 코드
public/          로고와 정적 파일
nginx*.conf      배포용 API 프록시 설정
```

## Backend 통신

브라우저는 서비스 주소를 직접 호출하지 않고 `/api`를 사용합니다. 로컬 kind Ingress 또는 운영 프록시가 경로별로 담당 서비스를 연결합니다.

```text
/auth, /users       → Identity
/strategies         → Strategy
/paper-account      → Trading
/trades, 실행·청산  → Trading
/positions, 분석    → Portfolio
```

모의와 실전 화면은 URL의 mode 값을 기준으로 별도 상태를 유지합니다. 화면이 직접 주문을 실행하는 것이 아니라, Backend API가 권한·예산·포지션을 검증한 뒤 처리합니다.

## 로컬 실행과 빌드

```sh
npm ci
npm run dev
npm run lint
npm run build
```

로컬 개발 서버는 기본적으로 kind Ingress의 `http://127.0.0.1:8080`을 API 대상으로 사용합니다. 운영에서는 `npm run build` 결과물을 S3에 올리고 CloudFront로 제공합니다.
