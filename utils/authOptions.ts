import { type AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          acces_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sing in
    async signIn({ profile }) {
      //TODO:
      // Connect to DB
      // Chech if user exists
      // if not create user
      // return true to allow sign in
    },
    //Session callback function that modifies session object
    async session({ session }) {
      //TODO:
      // Get user from db
      // Assign user id from the session
      // return session
    },
  },
};
