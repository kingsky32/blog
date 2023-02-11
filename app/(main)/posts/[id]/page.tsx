import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import prisma from '#libs/prisma';
import styles from './page.module.scss';

export default async function Page({ params }: { params?: { id: string } }) {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(params?.id),
    },
    include: {
      createdBy: true,
    },
  });
  if (!post) notFound();
  return (
    <div className={styles.container}>
      <Image
        className={styles.thumbnail}
        src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
        width={644}
        height={322}
        alt={post.title}
      />
      <h1 className={styles.title}>{post.title}</h1>
      <Link
        href={`/profiles/${post.createdBy.id}`}
        className={styles.profileContainer}
      >
        <Image
          className={styles.profileImage}
          src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
          alt={post.createdBy.nickname ?? ''}
          width={48}
          height={48}
        />
        <div className={styles.profileContentsContainer}>
          <p className={styles.profileName}>{post.createdBy.nickname ?? ''}</p>
          <p className={styles.createdAt}>
            {dayjs(post.createdAt).format('YYYY. M. D')}
          </p>
        </div>
      </Link>
      <div
        className={styles.contents}
        dangerouslySetInnerHTML={{ __html: post.contents }}
      />
    </div>
  );
}
