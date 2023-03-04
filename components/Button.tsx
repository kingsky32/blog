import React from 'react';
import classNames from '#utils/classNames';
import styles from './Button.module.scss';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'medium' | 'large';
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function FormButton(
    { type, size, children, className, htmlType, disabled, loading, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={htmlType ?? 'button'}
        disabled={disabled || loading}
        className={classNames(
          styles.button,
          loading && styles.loading,
          type && styles[type],
          size && styles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;
