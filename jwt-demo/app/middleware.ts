// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validate_jwt } from '@yash112/jwt-library';

const secret = process.env.JWT_SECRET;

export function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (token && secret) {
    const isValid = validate_jwt(secret, token);

    if (isValid) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Unauthorized', { status: 401 });
}

export const config = {
  matcher: ['/api/secure/:path*'],
};
