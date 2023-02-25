import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '#libs/prisma';

export interface UpdateAdminMenuRequest {
  icon?: string | null;
  name: string;
  link: string;
  isActive: boolean;
  children?: UpdateAdminMenuRequest[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST': {
      await prisma.adminMenu.deleteMany();
      await Promise.all(
        (req.body as UpdateAdminMenuRequest[]).map(
          (updateAdminMenuRequest, updateAdminMenuRequestIndex) =>
            prisma.adminMenu
              .create({
                data: {
                  icon: updateAdminMenuRequest.icon,
                  name: updateAdminMenuRequest.name,
                  link: updateAdminMenuRequest.link,
                  isActive: updateAdminMenuRequest.isActive,
                  orderNum: updateAdminMenuRequestIndex + 1,
                },
              })
              .then((createdAdminMenu) =>
                prisma.adminMenu.createMany({
                  data:
                    updateAdminMenuRequest.children?.map(
                      (adminMenuChild, adminMenuChildIndex) => ({
                        icon: adminMenuChild.icon,
                        name: adminMenuChild.name,
                        link: adminMenuChild.link,
                        isActive: adminMenuChild.isActive,
                        orderNum: adminMenuChildIndex + 1,
                        parentId: createdAdminMenu.id,
                      }),
                    ) ?? [],
                }),
              ),
        ),
      );
      return res.status(201).end();
    }
    default: {
      return res.status(404).end();
    }
  }
}
