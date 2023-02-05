import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getSession } from '#libs/session';

export default withAuth(
  async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.includes('.')) return NextResponse.next();
    if (
      ['/sign_in', '/sign_up', '/find_id', '/find_pw'].includes(
        request.nextUrl.pathname,
      )
    ) {
      const cookie = request.headers.get('cookie');
      if (cookie) {
        const session = await getSession(cookie);
        if (session && !session.error) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);