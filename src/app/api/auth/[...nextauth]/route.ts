import { AxiosError } from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { signIn as signInApi, signInWithGoogle as signInWithGoogleApi } from '@/services/api/auth';
import { User } from '@/types/user';

const handler = NextAuth({
  providers: [
    // CredentialsProvider({
    //   name: 'Sign in with Email',
    //   credentials: {
    //     email: { label: 'Email', type: 'text' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize: async (credentials, _req) => {
    //     if (!credentials?.email || !credentials?.password) return null;
    //     const { email, password } = credentials;

    //     try {
    //       const res = await signInApi({ email, password, authType: 'EMAIL' });

    //       return {
    //         id: res.result.user.id.toString(),
    //         accessToken: res.result.accessToken,
    //         expiresIn: res.result.expiresIn,
    //         user: res.result.user,
    //       };
    //     } catch (error) {
    //       const errorResponse = (error as AxiosError<any>).response;

    //       throw new Error(errorResponse?.data?.message);
    //     }
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account) {
        if (account.provider === 'credentials') {
          token.accessToken = user.accessToken;
          token.user = user.user;
          token.accessTokenExpires = Date.now() + user.expiresIn * 1000;
        }

        if (account.provider === 'google') {
          try {
            const res = await signInWithGoogleApi({
              email: user.email,
              googleId: user.id,
              name: user.name,
              avatar: user.image,
            });

            token.accessToken = res.result.accessToken;
            token.user = res.result.user;
            token.accessTokenExpires = Date.now() + res.result.expiresIn * 1000;
          } catch (error) {
            const errorResponse = (error as AxiosError<any>).response;

            throw new Error(errorResponse?.data?.message);
          }
        }
      }

      return token;
    },
    session: async ({ token, session }) => {
      session.accessToken = token.accessToken as string;
      session.user = token.user as User;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };
