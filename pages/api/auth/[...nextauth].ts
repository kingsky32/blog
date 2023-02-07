import bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '#libs/prisma';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET_KEY,
  adapter: PrismaAdapter(prisma),
  jwt: { maxAge: 60 * 60 * 24 * 30 },
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: {
          label: '아이디',
          type: 'email',
          placeholder: '아이디를 입력해주세요',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호를 입력해주세요',
        },
        isAuto: {
          label: '자동 로그인',
          type: 'checkbox',
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
          include: {
            role: {
              select: {
                name: true,
                level: true,
              },
            },
          },
        });
        if (!user) return null;
        if (!user.password) return null;
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.id = profile?.id;
      }
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      session.user = await prisma.user.findUnique({
        where: { id: token.uid as string },
        select: {
          id: true,
          bio: true,
          email: true,
          firstName: true,
          lastName: true,
          name: true,
          nickname: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/sign_in',
    newUser: '/sign_up',
  },
  cookies:
    process.env.NODE_ENV === 'development'
      ? {
          sessionToken: {
            name: process.env.SESSION_TOKEN_NAME,
            options: {
              httpOnly: true,
              sameSite: 'None',
              path: '/',
              secure: true,
            },
          },
        }
      : {},
};

export default NextAuth(authOptions);
