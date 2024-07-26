import { encode_jwt, decode_jwt, validate_jwt } from '../index';

const secret = 'test_secret';
const payload = { name: 'John Doe' };

test('encode and decode JWT', () => {
  const token = encode_jwt(secret, 1, payload, 3600);
  const decoded = decode_jwt(secret, token);
  expect(decoded.id).toBe('1');
  expect(decoded.payload).toMatchObject(payload);
});

test('validate JWT', () => {
  const token = encode_jwt(secret, 1, payload, 3600);
  expect(validate_jwt(secret, token)).toBe(true);
});

test('invalidate JWT', () => {
  const invalidToken = 'invalid_token';
  expect(validate_jwt(secret, invalidToken)).toBe(false);
});
