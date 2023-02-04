import { Session } from 'next-auth';

export async function getSession(cookie: string): Promise<Session | null> {
  const session = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  }).then((res) => res.json());
  if (!session) return null;
  return Object.keys(session).length ? session : null;
}
