import '#styles/reset.scss';
import '#styles/global.scss';

import React from 'react';
import { headers } from 'next/headers';
import Link from 'next/link';
import Logo from '#components/Logo';
import dayjs from 'dayjs';
import { getSession } from '#libs/session';
import prisma from '#libs/prisma';
import GlobalNavigationBar from './GlobalNavigationBar';
import styles from './layout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function MainLayout({ children }: MainLayoutProps) {
  const [config, session] = await Promise.all([
    prisma.config.findFirst({
      select: { title: true },
      orderBy: { createdAt: 'desc' },
    }),
    getSession(headers().get('cookie') as string),
  ]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <h1>
            <Link href="/">
              <Logo width="10rem" />
            </Link>
          </h1>
          <GlobalNavigationBar session={session} />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy;{dayjs().year()}.{' '}
          <Link href="/">{config?.title ?? 'Seung Ju'}</Link> All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
