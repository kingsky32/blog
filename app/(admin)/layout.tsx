import React from 'react';
import prisma from '#libs/prisma';
import AdminLayout from './AdminLayout';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, menus] = await Promise.all([
    prisma.config.findFirst({
      select: { title: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.adminMenu.findMany({
      select: {
        id: true,
        icon: true,
        name: true,
        link: true,
        children: {
          select: {
            id: true,
            icon: true,
            name: true,
            link: true,
          },
        },
      },
      where: {
        isActive: true,
        parentId: null,
      },
      orderBy: [
        {
          orderNum: 'asc',
        },
      ],
    }),
  ]);
  return (
    <AdminLayout
      menus={menus.map((menu) => ({
        key: `Menu-${menu.id}`,
        ...menu,
        children: menu.children?.length
          ? menu.children.map((childMenu) => ({
              key: `Menu-${menu.id}-${childMenu.id}`,
              ...childMenu,
            }))
          : undefined,
      }))}
      title={config?.title ?? 'Seung Ju'}
    >
      {children}
    </AdminLayout>
  );
}
