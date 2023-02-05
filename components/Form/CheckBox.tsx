import React from 'react';
import classNames from '#utils/classNames';
import styles from './CheckBox.module.scss';

export interface FormCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormCheckBox = React.forwardRef<HTMLInputElement, FormCheckBoxProps>(
  function FormCheckBox({ className, label, ...props }, ref) {
    return (
      <label className={classNames(styles.container, className)}>
        <input ref={ref} type="checkbox" className={styles.input} {...props} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

export default FormCheckBox;
