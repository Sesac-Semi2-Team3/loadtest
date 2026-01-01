import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    fixed_rps: {
      executor: 'constant-arrival-rate',
      rate: 1500,          // 🔥 위와 반드시 동일
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 500,
      maxVUs: 3000,
    },
  },
};

const BASE_URL = 'http://gfs-alb-2119831966.ap-northeast-2.elb.amazonaws.com';

export default function () {
  const r = Math.random();

  // 🔴 WRITE 30% → Direct DB
  if (r < 0.3) {
    const res = http.post(`${BASE_URL}/api/jobs/direct`);
    check(res, {
      'direct write ok': (r) => r.status === 200,
    });
  }
  // 🔵 READ 70% → Direct DB
  else {
    const id = Math.floor(Math.random() * 100) + 1;
    const res = http.get(`${BASE_URL}/api/jobs/${id}/direct`);
    check(res, {
      'direct read ok': (r) => r.status === 200,
    });
  }
}
