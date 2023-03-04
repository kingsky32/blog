import React from 'react';
import prisma from '#libs/prisma';
import Table from '#components/Table';
import Link from 'next/link';
import Button from '#components/Button';
import Space from '#components/Space';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <Space direction="column" gap={16}>
      <Space justify="end">
        <Button type="primary">
          <Link href="/admin/blog/category/create">등록</Link>
        </Button>
      </Space>
      <Table
        items={await prisma.category.findMany({
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
        })}
        columns={[
          {
            title: '번호',
            width: 60,
            align: 'center',
            render: (_value, _item, itemIndex) => itemIndex + 1,
          },
          {
            title: '카테고리 코드',
            dataIndex: 'code',
          },
          {
            title: '카테고리 이름',
            dataIndex: 'name',
          },
          {
            title: '액션',
            dataIndex: 'code',
            align: 'center',
            width: 160,
            render: (value) => (
              <Space>
                <Button type="primary" style={{ flex: 1 }}>
                  <Link href={`/admin/blog/category/detail/${value}`}>
                    상세
                  </Link>
                </Button>
                <Button style={{ flex: 1 }}>
                  <Link href={`/admin/blog/category/update/${value}`}>
                    수정
                  </Link>
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </Space>
  );
}
