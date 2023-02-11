import React from 'react';
import prisma from '#libs/prisma';
import Table from './Table';

export default async function Page() {
  const adminMenus = await prisma.adminMenu.findMany({
    select: {
      id: true,
      icon: true,
      name: true,
      link: true,
      isActive: true,
      children: {
        select: {
          id: true,
          icon: true,
          name: true,
          link: true,
          isActive: true,
        },
      },
    },
    where: {
      parentId: null,
    },
    orderBy: {
      orderNum: 'asc',
    },
  });

  return (
    <Table
      data={adminMenus.map((adminMenu) => ({
        key: `Menu-${adminMenu.id}`,
        icon: adminMenu.icon,
        name: adminMenu.name,
        link: adminMenu.link,
        isActive: adminMenu.isActive,
        children: adminMenu.children.map((childAdminMenu) => ({
          key: `Menu-${adminMenu.id}-${childAdminMenu.id}`,
          icon: childAdminMenu.icon,
          name: childAdminMenu.name,
          link: childAdminMenu.link,
          isActive: childAdminMenu.isActive,
        })),
      }))}
    />
  );
}
