'use client';

import React from 'react';
import Link from 'next/link';
import { Layout } from 'antd';
import dayjs from 'dayjs';

export default function InitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider breakpoint="lg" collapsedWidth="0" />
      <Layout>
        <Layout.Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, backgroundColor: '#ffffff' }}>
            {children}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          &copy;{dayjs().year()}. <Link href="/">SeungJuBlog</Link> All rights
          reserved.
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
