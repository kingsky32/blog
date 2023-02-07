import { Context, Resolver } from 'graphql';

export default {
  Mutation: {
    updateAdminMenu: async (
      _source: any,
      args: {
        adminMenus: { icon?: string; name: string; link: string }[];
      },
      { prisma }: Context,
    ) => {
      await prisma.adminMenu.deleteMany();
      await prisma.adminMenu.createMany({
        data: args.adminMenus.map((adminMenu, index) => ({
          ...adminMenu,
          orderNum: index + 1,
        })),
        skipDuplicates: true,
      });
      return prisma.adminMenu.findMany();
    },
  },
} as Resolver;
