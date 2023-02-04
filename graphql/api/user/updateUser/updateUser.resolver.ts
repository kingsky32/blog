import { Context, Resolver } from 'graphql';

export interface UpdateUserArgs {
  image: string;
  firstName: string;
  lastName: string;
  nickName: string;
}

export default {
  Mutation: {
    updateUser: (
      _source: any,
      args: UpdateUserArgs,
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
