// implementing the next auth 
// sets up login for our app using next auth

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        // get email and password
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        // if either empty, return null
        if (!email || !password) {
            return null;
        }

        // find the user by email
        const result = await pool.query(
          'SELECT * FROM bytesized_users WHERE email = $1', [email]
        );
        const user = result.rows[0];

        // if not in db, return 
        if (!user) {
            return null;
        }

        // check if password is correct
        const match = await bcrypt.compare(password, user.password);
        
        // if password not correct, return
        if (!match) {
            return null;
        }

        // return the user - next auth saves in session
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  // json web token 
  session: { strategy: 'jwt' },

  // adding role and id for session for app
  callbacks: {
    async jwt({ token, user }) {
      // getting id and role
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // role and id for session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});