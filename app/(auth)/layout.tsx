import '#styles/reset.scss';
import '#styles/global.scss';

import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import prisma from '#libs/prisma';
import Logo from '#components/Logo';
import styles from './layout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function MainLayout({ children }: MainLayoutProps) {
  const config = await prisma.config.findFirst({
    select: { title: true },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <h1>
            <Link href="/">
              <Logo width="10rem" />
            </Link>
          </h1>
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
