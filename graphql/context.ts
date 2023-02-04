import prisma from '#libs/prisma';
import jwt from 'jsonwebtoken';
import { getSession } from 'next-auth/react';
import { PrismaClient, User } from '@prisma/client';

export interface GraphqlContext {
  prisma: PrismaClient;
  user: User | null;
}

export async function createContext({ req }: any): Promise<GraphqlContext> {
  const token = req.headers.authorization;
  const obj: GraphqlContext = {
    prisma,
    user: null,
  };
  const session = await getSession({ req });

  if (session) {
    const { id } = session.user;
    obj.user = await prisma.user.findUnique({ where: { id } });
  } else if (token) {
    const { id } = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET_KEY,
    ) as jwt.JwtPayload;
    obj.user = await prisma.user.findUnique({ where: { id } });
  }

  return obj;
}
