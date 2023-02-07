import { Role } from '@prisma/client';
import { ISODateString } from 'next-auth/core/types';

declare module 'next-auth' {
  export interface DefaultSession {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
    };
    expires: ISODateString;
  }
  export interface DefaultUser {
    id: string;
    role?: Omit<Role, 'id'>;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
  export interface Profile {
    id?: string;
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
  }
  interface Session {
    user: User;
    error: any;
  }
}
