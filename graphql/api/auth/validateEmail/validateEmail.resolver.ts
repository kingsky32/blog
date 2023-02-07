import { Context, Resolver } from 'graphql';
import { GraphQLError } from 'graphql/error';

export default {
  Query: {
    validateEmail: async (
      _source: any,
      args: {
        email: string;
      },
      { prisma }: Context,
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (user) throw new GraphQLError('이미 사용중인 이메일입니다');
      return true;
    },
  },
} as Resolver;
