'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import styles from './GlobalNavigationBar.module.scss';

export interface GlobalNavigationBarProps {
  session?: Session | null;
}

export default function GlobalNavigationBar({
  session,
}: GlobalNavigationBarProps) {
  return (
    <nav className={styles.gnb}>
      {session ? (
        <button type="button" className={styles.link} onClick={() => signOut()}>
          로그아웃
        </button>
      ) : (
        <Link className={styles.link} href="/sign_in">
          로그인
        </Link>
      )}
    </nav>
  );
}
