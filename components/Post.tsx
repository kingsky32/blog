import React from 'react';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import classNames from '#utils/classNames';
import styles from './Post.module.scss';

export interface ListItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    LinkProps {
  thumbnail: string;
  title: string;
  contents: string;
  createdAt: Date;
}

export default function Post({
  className,
  thumbnail,
  title,
  contents,
  createdAt,
  ...props
}: ListItemProps): React.ReactElement<ListItemProps> {
  return (
    <Link className={classNames(styles.container, className)} {...props}>
      <Image
        className={styles.thumbnail}
        src={thumbnail}
        alt={title}
        width={240}
        height={240}
      />
      <div className={styles.contentsContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.contents}>{contents}</p>
        <p className={styles.createdAt}>
          {dayjs(createdAt).format('YYYY. M. D')}
        </p>
      </div>
    </Link>
  );
}
