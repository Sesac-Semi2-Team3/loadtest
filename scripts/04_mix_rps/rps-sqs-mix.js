import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    fixed_rps: {
      executor: 'constant-arrival-rate',
      rate: 1500,          // 🔥 초당 요청 수 (RPS)
      timeUnit: '1s',
      duration: '2m',      // 충분히 길게
      preAllocatedVUs: 500,
      maxVUs: 3000,
    },
  },
};

const BASE_URL = 'http://gfs-alb-2119831966.ap-northeast-2.elb.amazonaws.com';

export default function () {
  const r = Math.random();

  // 🔴 WRITE 30% → SQS
  if (r < 0.3) {
    const res = http.post(`${BASE_URL}/api/jobs/async`);
    check(res, {
      'async write ok': (r) => r.status === 200,
    });
  }
  // 🔵 READ 70% → Redis
  else {
    const id = Math.floor(Math.random() * 100) + 1;
    const res = http.get(`${BASE_URL}/api/jobs/${id}`);
    check(res, {
      'redis read ok': (r) => r.status === 200,
    });
  }
}
