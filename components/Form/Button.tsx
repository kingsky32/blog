import React from 'react';
import classNames from '#utils/classNames';
import styles from './Button.module.scss';

export interface FormButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: string;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
}

const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  function FormButton(
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type,
      children,
      className,
      htmlType,
      disabled,
      loading,
      ...props
    },
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
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default FormButton;
