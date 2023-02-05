import { Context, Resolver } from 'graphql';
import { ApolloError } from 'apollo-server-micro';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    join: async (
      _parent: any,
      args: {
        firstName: string;
        lastName: string;
        nickname: string;
        username: string;
        email: string;
        password: string;
        bio: string;
        image: string;
      },
      { prisma }: Context,
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          username: args.username,
        },
      });
      if (user) throw new ApolloError('이미 존재한 계정 입니다');
      const data = { ...args };
      data.password = await bcrypt.hash(args.password, 10);
      return prisma.user.create({
        data,
      });
    },
  },
} as Resolver;
