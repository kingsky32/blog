import React from 'react';
import classNames from '#utils/classNames';
import styles from './Space.module.scss';

export type SpaceProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] & {
    children?: React.ReactNode;
    gap?: number;
    className?: React.HTMLAttributes<HTMLDivElement>['className'];
    justify?: 'start' | 'center' | 'end';
    direction?: 'row' | 'column';
    element?: T;
  };

export default function Space<T extends keyof JSX.IntrinsicElements>({
  children,
  gap,
  className,
  justify,
  direction,
  element,
  style,
  ...props
}: SpaceProps<T>) {
  const Element = element ?? 'div';
  return (
    // @ts-ignore
    <Element
      className={classNames(styles.space, className)}
      style={{
        gap: gap ?? 6,
        justifyContent: {
          start: 'flex-start',
          center: 'center',
          end: 'flex-end',
        }[justify ?? 'start'],
        flexDirection: direction ?? 'row',
        ...(style ?? {}),
      }}
      {...props}
    >
      {children}
    </Element>
  );
}
