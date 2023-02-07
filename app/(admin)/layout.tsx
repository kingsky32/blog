import React from 'react';
import AdminLayout from './AdminLayout';

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
    },
    orderBy: [
      {
        orderNum: 'asc',
      },
    ],
  });
  return (
    <AdminLayout
      menus={menus.map((menu) => ({ key: `Menu-${menu.id}`, ...menu }))}
    >
      {children}
    </AdminLayout>
  );
}
