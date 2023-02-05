import { Context, Resolver } from 'graphql';

export default {
  Mutation: {
    updateUser: (
      _source: any,
      args: {
        image: string;
        firstName: string;
        lastName: string;
        nickName: string;
      },
      { prisma, user }: Context,
    ) => {
      return prisma.user.update({
        where: {
          id: user.id,
        },
        data: args,
      });
    },
  },
} as Resolver;
