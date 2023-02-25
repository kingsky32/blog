import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getSession } from '#libs/session';
import * as process from 'process';

let isInit = false;

export default withAuth(
  async function middleware(request: NextRequest) {
    if (
      request.nextUrl.pathname.includes('.') ||
      request.nextUrl.pathname.startsWith('/api')
    )
      return NextResponse.next();
    if (request.nextUrl.pathname !== '/init') {
      if (!isInit) {
        isInit = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/init`,
        ).then((res) => res.ok);
        if (!isInit) {
          return NextResponse.redirect(new URL('/init', request.url));
        }
      }
    } else if (isInit) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (
      ['/sign_in', '/sign_up', '/find_id', '/find_pw'].includes(
        request.nextUrl.pathname,
      )
    ) {
      const cookie = request.headers.get('cookie');
      if (cookie) {
        const session = await getSession(cookie);
        if (session) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    }
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const cookie = request.headers.get('cookie');
      if (cookie) {
        const session = await getSession(cookie);
        if (!session) {
          return NextResponse.redirect(new URL('/sign_in', request.url));
        }
      } else {
        return NextResponse.redirect(new URL('/sign_in', request.url));
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
