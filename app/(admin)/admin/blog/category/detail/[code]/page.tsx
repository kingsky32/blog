import React from 'react';
import Link from 'next/link';
import prisma from '#libs/prisma';
import Descriptions from '#components/Descriptions';
import Space from '#components/Space';
import Button from '#components/Button';
import DeleteButton from './DeleteButton';

export default async function Page({ params }: { params: { code: string } }) {
  const data = await prisma.category.findFirst({
    where: {
      code: params.code,
    },
  });

  return (
    <Space direction="column" gap={16}>
      <Descriptions>
        <Descriptions.Item title="카테고리 코드">
          {data?.code}
        </Descriptions.Item>
        <Descriptions.Item title="카테고리 이름">
          {data?.name}
        </Descriptions.Item>
      </Descriptions>
      <Space justify="end">
        <Button>
          <Link href="/admin/blog/category">목록</Link>
        </Button>
        <Button type="primary">
          <Link href={`/admin/blog/category/update/${params.code}`}>수정</Link>
        </Button>
        <DeleteButton code={params.code} />
      </Space>
    </Space>
  );
}
