import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '#libs/prisma';

export interface CreateCategoryRequest {
  code: string;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST': {
      const body = req.body as CreateCategoryRequest;
      await prisma.category.create({ data: body });
      return res.status(201).end();
    }
    default: {
      return res.status(404).end();
    }
  }
}
