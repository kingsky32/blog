import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '#libs/prisma';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST': {
      const user = await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      });
      if (user) {
        return res.status(409).json({ message: '이미 가입된 계정입니다' });
      }
      const data = { ...req.body };
      data.password = await bcrypt.hash(req.body.password, 10);
      await prisma.user.create({ data });
      return res.status(201).end();
    }
    default: {
      return res.status(404).end();
    }
  }
}
