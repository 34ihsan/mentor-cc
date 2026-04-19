import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Normal load
    { duration: '1m', target: 50 },  // Heavy load
    { duration: '30s', target: 0 },  // Scale down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // 1. Homepage
  let res = http.get(`${BASE_URL}/`);
  check(res, {
    'homepage status is 200': (r) => r.status === 200,
  });

  // 2. Mock some wait
  sleep(1);

  // 3. API session check (Auth overhead)
  res = http.get(`${BASE_URL}/api/auth/session`);
  check(res, {
    'auth api status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
