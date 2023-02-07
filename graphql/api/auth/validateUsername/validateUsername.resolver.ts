import { Context, Resolver } from 'graphql';
import { GraphQLError } from 'graphql/error';

export default {
  Query: {
    validateUsername: async (
      _source: any,
      args: {
        username: string;
      },
      { prisma }: Context,
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          username: args.username,
        },
      });
      if (user) throw new GraphQLError('이미 사용중인 아이디입니다');
      return true;
    },
  },
} as Resolver;
