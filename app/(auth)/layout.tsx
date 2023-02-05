import '#styles/reset.scss';
import '#styles/global.scss';

import React from 'react';
import Logo from '#components/Logo';
import Link from 'next/link';
import dayjs from 'dayjs';
import styles from './layout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps): React.ReactElement {
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
          &copy;{dayjs().year()}. <Link href="/">SeungJuBlog</Link> All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
