import React from 'react';
import prisma from '#libs/prisma';
import AdminLayout from './AdminLayout';

export const dynamic = 'auto';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = await prisma.adminMenu.findMany({
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
  });
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
    >
      {children}
    </AdminLayout>
  );
}
