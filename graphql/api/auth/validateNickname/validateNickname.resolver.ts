import { Context, Resolver } from 'graphql';
import { GraphQLError } from 'graphql/error';

export default {
  Query: {
    validateNickname: async (
      _source: any,
      args: {
        nickname: string;
      },
      { prisma }: Context,
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          nickname: args.nickname,
        },
      });
      if (user) throw new GraphQLError('이미 사용중인 닉네임입니다');
      return true;
    },
  },
} as Resolver;
