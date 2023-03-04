import React from 'react';
import prisma from '#libs/prisma';
import Form from './Form';

export default async function Page({ params }: { params: { code: string } }) {
  const data = await prisma.category.findFirst({
    where: {
      code: params.code,
    },
  });
  if (!data) return null;
  return <Form code={data.code} name={data.name} />;
}
