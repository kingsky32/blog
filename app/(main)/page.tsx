import React from 'react';
import prisma from '#libs/prisma';
import Post from '#components/Post';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.listsContainer}>
        {posts.map((post) => {
          return (
            <Post
              className={styles.list}
              href={`/posts/${post.id}`}
              thumbnail="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
              title={post.title}
              contents={post.contents}
              createdAt={post.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
}
