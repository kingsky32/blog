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
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
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
        token.accessToken = account.access_token;
        token.id = profile?.id;
      }
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      session.accessToken = token.accessToken as string;
      session.user.id = token.uid as string;
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
