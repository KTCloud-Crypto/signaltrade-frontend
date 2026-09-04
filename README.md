# SignalTrade Frontend

사용자가 SignalTrade의 기능을 이용하는 React/Vite 웹 애플리케이션입니다. 로그인부터 전략 설정, 모의·실전 투자 현황, 거래 내역과 성과 분석까지 여러 Backend 도메인의 데이터를 하나의 화면으로 연결합니다.

## 주요 역할

- 회원가입, 로그인, 비밀번호 재설정 화면
- 모의투자와 실전투자 대시보드
- 전략 선택, 주문 예산, 분봉, 손절·익절 설정
- 활성 전략, 전략 신호와 주문 실행 결과 표시
- 모의계좌 입출금과 실제 Upbit 잔고 표시
- 거래 내역, 포지션, 손익과 사용자 분석 제공
- Upbit API Key와 Telegram 연결 설정

Frontend는 화면 상태와 사용자 입력을 관리하지만, 주문 가능 여부나 잔고 정합성 같은 업무 규칙을 직접 결정하지 않습니다. 최종 검증과 처리는 각 Backend 서비스가 담당합니다.

## 데이터 권한

DB 테이블을 소유하지 않으며 PostgreSQL에 직접 연결하지 않습니다. 모든 읽기와 변경은 HTTP API를 통해 요청합니다. Queue와 Redis에도 직접 접근하지 않습니다.

## Backend 통신

브라우저는 개별 서비스 주소를 직접 알지 않고 Nginx의 `/api` 경로를 호출합니다. Nginx 또는 Kubernetes Ingress가 요청 경로에 따라 담당 서비스로 전달합니다.

- 회원·인증·API Key·Telegram 설정 → Identity
- 전략 목록·사용자 전략·신호 → Strategy
- 주문 실행·거래 내역·모의계좌 → Trading
- 실제 잔고·포지션·손익·정합성 → Portfolio

로그인 후 발급받은 Access Token을 API 요청에 포함하며, Backend가 사용자 권한과 실행 모드를 확인합니다. 모의투자와 실전투자는 화면 경로와 mode 값으로 구분하지만 동일 사용자의 데이터가 섞이지 않도록 Backend에서도 다시 검증합니다.

## 실행 구조

개발 중에는 Vite 개발 서버를 사용할 수 있고, 로컬 통합 환경에서는 Docker 이미지의 Nginx가 정적 파일과 API 프록시를 함께 제공합니다. kind 환경의 기본 UI 주소는 `http://localhost:8080`입니다.

운영에서는 빌드된 정적 파일을 S3·CloudFront 같은 정적 호스팅에 배치할 수 있으며, API 주소는 환경 설정으로 분리합니다.
