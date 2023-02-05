import React from 'react';
import classNames from '#utils/classNames';
import styles from './Form.module.scss';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, children, ...props },
  ref,
): React.ReactElement<FormProps> {
  return (
    <form ref={ref} className={classNames(styles.form, className)} {...props}>
      {children}
    </form>
  );
});

export default Form;
