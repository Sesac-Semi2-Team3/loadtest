import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 1500 },
    { duration: '20s', target: 3000 },
    { duration: '60s', target: 4500 },
  ],
};

const BASE = 'http://gfs-alb-2119831966.ap-northeast-2.elb.amazonaws.com';

export default function () {
  const r = Math.random();

  // WRITE 20% → SQS
  if (r < 0.2) {
    const res = http.post(`${BASE}/api/jobs/async`);
    check(res, { 'async ok': (r) => r.status === 200 });
  }
  // READ 80% → Redis
  else {
    const id = Math.floor(Math.random() * 100) + 1;
    const res = http.get(`${BASE}/api/jobs/${id}`);
    check(res, { 'redis read ok': (r) => r.status === 200 });
  }

  sleep(0.01);
}
