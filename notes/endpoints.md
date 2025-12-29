# Test Endpoints

본 문서는 부하 테스트에서 호출하는 엔드포인트와 호출 비율을 정리합니다.

## Base URL

- BASE: http://gfs-alb-2119831966.ap-northeast-2.elb.amazonaws.com

## Read API

- Redis Read: GET /api/jobs/{id}
- Direct DB Read: GET /api/jobs/{id}/direct

## Write API

- SQS Async Write: POST /api/jobs/async
- Direct DB Write: POST /api/jobs/direct

## Mix Ratio (VU Ramp / RPS Mix 공통)

- Read 80%
- Write 20%

(고정 RPS 테스트는 스크립트에 정의된 비율을 따릅니다.)
