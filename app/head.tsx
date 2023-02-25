import React from 'react';
import prisma from '#libs/prisma';

export const dynamic = 'force-dynamic';

export default async function Head() {
  const config = await prisma.config.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  return (
    <>
      <title>{config?.title ?? 'Seung Ju'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={config?.description ?? 'Seung Ju'} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
