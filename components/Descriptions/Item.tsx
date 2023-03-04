import React from 'react';
import classNames from '#utils/classNames';
import styles from './Item.module.scss';

export interface DescriptionsItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  label?: React.ReactNode;
}

export default function DescriptionsItem({
  children,
  title,
  className,
  ...props
}: DescriptionsItemProps) {
  return (
    <li className={classNames(styles.li, className)} {...props}>
      <dl className={styles.dl}>
        <dt className={styles.dt}>{title}</dt>
        <dd className={styles.dd}>{children}</dd>
      </dl>
    </li>
  );
}
