import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '#libs/prisma';
import bcrypt from 'bcrypt';

export interface InitSiteRequest {
  title: string;
  description: string;
}

export interface InitAdminRequest {
  name: string;
  nickname: string;
  username: string;
  email: string;
  password: string;
}

export interface InitRequest {
  site: InitSiteRequest;
  admin: InitAdminRequest;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST': {
      const config = await prisma.config.findFirst();
      if (config) {
        return res
          .status(409)
          .json({ message: '이미 초기 설정이 되어있습니다' });
      }
      const body = req.body as InitRequest;
      const adminData = { ...body.admin };
      adminData.password = await bcrypt.hash(body.admin.password, 10);
      await Promise.all([
        prisma.$transaction([
          prisma.config.create({ data: body.site }),
          prisma.user.create({ data: adminData }),
        ]),
        [
          {
            icon: 'DashboardOutlined',
            name: '대시보드',
            link: '/admin/dashboard',
          },
          {
            icon: 'SettingOutlined',
            name: '시스템 관리',
            link: '/admin/system',
            children: [
              {
                name: '기본 관리',
                link: '/admin/system/default',
              },
              {
                name: '권한 관리',
                link: '/admin/system/permission',
              },
              {
                name: '메뉴 관리',
                link: '/admin/system/menu',
              },
              {
                name: '키 관리',
                link: '/admin/system/key',
              },
            ],
          },
        ].map((adminMenu, adminMenuIndex) =>
          prisma.adminMenu
            .create({
              data: {
                icon: adminMenu.icon,
                name: adminMenu.name,
                link: adminMenu.link,
                isActive: true,
                orderNum: adminMenuIndex + 1,
              },
            })
            .then((createdAdminMenu) =>
              prisma.adminMenu.createMany({
                data:
                  adminMenu.children?.map(
                    (adminMenuChild, adminMenuChildIndex) => ({
                      name: adminMenuChild.name,
                      link: adminMenuChild.link,
                      isActive: true,
                      orderNum: adminMenuChildIndex + 1,
                      parentId: createdAdminMenu.id,
                    }),
                  ) ?? [],
              }),
            ),
        ),
      ]);
      return res.status(201).end();
    }
    case 'GET': {
      const config = await prisma.config.findFirst();
      if (!config) {
        return res.status(404).end();
      }
      return res.status(200).end();
    }

    default: {
      return res.status(404).end();
    }
  }
}
