'use client';

import React from 'react';
import { Layout, Menu, theme, Breadcrumb } from 'antd';
import * as Icons from '@ant-design/icons';
import dayjs from 'dayjs';
import Link from 'next/link';
import Logo from '#components/Logo';

export interface MenuProps {
  key: React.Key;
  icon?: string | null;
  link: string;
  name: string;
}

export default function AdminLayout({
  children,
  menus,
}: {
  children: React.ReactNode;
  menus: MenuProps[];
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Layout.Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <h1>
          <Link href="/admin">
            <Logo width="15rem" fill="#ffffff" style={{ margin: 16 }} />
          </Link>
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          items={menus.map((menu) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const Icon = Icons[menu.icon];
            return {
              key: menu.key,
              icon: Icon && <Icon />,
              label: <Link href={menu.link}>{menu.name}</Link>,
            };
          })}
        />
      </Layout.Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: 200, minHeight: '100vh' }}
      >
        <Layout.Header style={{ padding: 0, background: colorBgContainer }} />
        <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              minHeight: '100%',
            }}
          >
            <Breadcrumb />
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
