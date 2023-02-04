import { cookies, headers } from 'next/headers';
import {
  ReadonlyHeaders,
  ReadonlyRequestCookies,
} from 'next/dist/server/app-render';

export interface Context {
  headers: ReadonlyHeaders;
  cookies: ReadonlyRequestCookies;
}

export function getContext(): Context {
  return {
    headers: headers(),
    cookies: cookies(),
  };
}
