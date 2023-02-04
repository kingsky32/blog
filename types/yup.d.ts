import * as yup from 'yup';

declare module 'yup' {
  export type Shape<T extends Record<any, any>> = Record<
    keyof T,
    yup.AnySchema
  >;
}
