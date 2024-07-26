import jwt from 'jsonwebtoken';

interface JWTPayload {
  id: string | number;
  [key: string]: any;
}

export function encode_jwt(secret: string, id: string | number, payload: object, ttl?: number): string {
  const expiresIn = ttl ? { expiresIn: ttl } : {};
  return jwt.sign({ id, ...payload }, secret, expiresIn);
}

export function decode_jwt(secret: string, token: string): { id: string, payload: object, expires_at: Date } {
  const decoded = jwt.verify(token, secret) as JWTPayload;
  const { id, exp, ...payload } = decoded;
  return {
    id: String(id),
    payload,
    expires_at: new Date(exp * 1000)
  };
}

export function validate_jwt(secret: string, token: string): boolean {
  try {
    decode_jwt(secret, token);
    return true;
  } catch {
    return false;
  }
}
