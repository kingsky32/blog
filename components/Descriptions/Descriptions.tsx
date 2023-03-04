import React from 'react';
import classNames from '#utils/classNames';
import styles from './Descriptions.module.scss';

export interface DescriptionsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
}

export default function Descriptions({
  children,
  className,
  ...props
}: DescriptionsProps) {
  return (
    <ul className={classNames(styles.ul, className)} {...props}>
      {children}
    </ul>
  );
}
