import axios from 'axios';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { setCookie } from 'nookies';

const nextAuthOptions = (req, res) => {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
          return axios
            .put(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
              email: credentials.email,
              password: credentials.password,
            })
            .then((response) => {
              const user = response.data;
              const token = JSON.stringify(response.data.token);
              console.log('token:', token);
              setCookie({ res }, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
              });
              return user;
            })
            .catch((err) => {
              console.log(err);
            });
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      jwt({ token, account, user }) {
        if (account) {
          token.id = user?.userUuid;
        }
        return token;
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        session.user.email = token.id;
        return session;
      },
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
