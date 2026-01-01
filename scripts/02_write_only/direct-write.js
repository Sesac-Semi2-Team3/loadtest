import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 3000,
  duration: '30s',
};

export default function () {
  const res = http.post(
    'http://gfs-alb-2119831966.ap-northeast-2.elb.amazonaws.com/api/jobs/direct'
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
