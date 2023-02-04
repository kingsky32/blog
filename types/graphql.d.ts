import { GraphQLFieldResolver } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

declare module 'graphql' {
  export type ResolverKeyType = 'Query' | 'Mutation';
  export type Context = { prisma: PrismaClient; user: User };
  export interface Resolver {
    [key: ResolverKeyType]: {
      [key: string]: GraphQLFieldResolver<any, Context, any, any>;
    };
  }
}
