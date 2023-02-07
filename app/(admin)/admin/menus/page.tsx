import React from 'react';
import Table from './Table';

export default async function Page() {
  const adminMenus = await prisma.adminMenu.findMany({
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
      }))}
    />
  );
}
