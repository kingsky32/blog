import { Context, Resolver } from 'graphql';

export default {
  Mutation: {
    updateAdminMenu: async (
      _source: any,
      args: {
        adminMenus: {
          icon?: string;
          name: string;
          link: string;
          isActive: boolean;
          children?: {
            icon?: string;
            name: string;
            link: string;
            isActive: boolean;
          }[];
        }[];
      },
      { prisma }: Context,
    ) => {
      await prisma.adminMenu.deleteMany();
      await Promise.all(
        args.adminMenus.map((adminMenu, adminMenuIndex) =>
          prisma.adminMenu
            .create({
              data: {
                icon: adminMenu.icon,
                name: adminMenu.name,
                link: adminMenu.link,
                isActive: adminMenu.isActive,
                orderNum: adminMenuIndex + 1,
              },
            })
            .then((createdAdminMenu) =>
              prisma.adminMenu.createMany({
                data:
                  adminMenu.children?.map(
                    (adminMenuChild, adminMenuChildIndex) => ({
                      icon: adminMenuChild.icon,
                      name: adminMenuChild.name,
                      link: adminMenuChild.link,
                      isActive: adminMenuChild.isActive,
                      orderNum: adminMenuChildIndex + 1,
                      parentId: createdAdminMenu.id,
                    }),
                  ) ?? [],
              }),
            ),
        ),
      );
      return prisma.adminMenu.findMany();
    },
  },
} as Resolver;
