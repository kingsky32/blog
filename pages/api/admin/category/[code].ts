import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '#libs/prisma';

export interface UpdateCategoryRequest {
  code: string;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'PUT': {
      const category = await prisma.category.findFirst({
        where: {
          code: req.query.code as string,
        },
      });
      if (!category) return res.status(404).end();
      await prisma.category.update({
        data: {
          ...(req.body as UpdateCategoryRequest),
        },
        where: {
          code: req.query.code as string,
        },
      });
      return res.status(201).end();
    }
    case 'DELETE': {
      const category = await prisma.category.findFirst({
        where: {
          code: req.query.code as string,
        },
      });
      if (!category) return res.status(404).end();
      await prisma.category.delete({
        where: {
          code: req.query.code as string,
        },
      });
      return res.status(201).end();
    }
    default: {
      return res.status(404).end();
    }
  }
}
