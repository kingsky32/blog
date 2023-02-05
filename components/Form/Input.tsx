import React from 'react';
import { FieldError } from 'react-hook-form';
import classNames from '#utils/classNames';
import styles from './Input.module.scss';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput({ className, label, error, ...props }, ref) {
    return (
      <label
        className={classNames(
          styles.container,
          error && styles.error,
          className,
        )}
      >
        {label && <p className={styles.label}>{label}</p>}
        <input ref={ref} className={styles.input} {...props} />
        {error?.message && (
          <p className={styles.description}>{error?.message}</p>
        )}
      </label>
    );
  },
);

export default FormInput;
