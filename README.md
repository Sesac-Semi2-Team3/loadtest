# loadtest

k6 기반 부하 테스트 스크립트 및 실행 결과(raw output)를 정리한 레포지토리입니다.

본 프로젝트는 버스트 트래픽 상황에서 DB 병목이 전체 응답 지연(tail latency)으로 전파되는 문제를
Redis(Read 캐시) + SQS(Write 비동기)로 분리/완충했을 때 어떤 변화가 있는지 비교하는 것을 목표로 합니다.

---

## 구성

- `scripts/` : k6 테스트 스크립트
- `results/` : k6 실행 결과 콘솔 출력(raw output) txt
- `notes/` : 테스트 대상 엔드포인트 및 전제 조건

---

## 테스트 시나리오

### 1) 단일 Read 성능 비교
- Redis Read API vs Direct DB Read API
- 결과: `results/single-read/`

### 2) Read/Write 혼합 부하 (VU Ramp)
- Write 20% + Read 80%
- VU 단계적으로 증가시키며 혼합 트래픽 상황 비교
- 결과: `results/mix/`

### 3) 고정 RPS (Constant Arrival Rate)
- 동일한 RPS로 일정 시간 동안 요청을 지속 주입
- 처리량/드롭/지연 분포 비교
- 결과: `results/rps/`

---

## 실행 방법

> 실행 전에 `notes/endpoints.md`의 BASE URL 및 엔드포인트를 확인합니다.

### 단일 Read
```bash
k6 run scripts/redis-read.js
k6 run scripts/db-read.js
