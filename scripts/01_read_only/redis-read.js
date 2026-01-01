import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 2000,
  duration: '30s',
};

export default function () {
  const res = http.get(
    'http://gfs-alb-2119831966.ap-northeast-2.elb.amazonaws.com/api/jobs/1'
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
