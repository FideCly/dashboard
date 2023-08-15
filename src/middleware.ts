// if there a token cookie and the local storage has a user id, then the user is logged in
// if there is a token cookie and the local storage does not have a user id, then the user is logged out
// if there is no token cookie and the local storage has a user id, then the user is logged out

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // if there a token cookie and the local storage has a user id, then the user is logged in
  if (request.cookies.get('token')) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/shops/:path*',
    '/campaign/:path*',
    '/scanner',
    '/promotion/:path*',
  ],
};
