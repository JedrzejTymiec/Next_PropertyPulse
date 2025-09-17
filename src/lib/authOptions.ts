import { type Session, type CallbacksOptions, type AuthOptions } from 'next-auth';
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google';
import { connectDB } from '@/lib/connectDB';
import { UserModel } from '@/models/User';

interface AuthOptionsType {
  providers: AuthOptions['providers'];
  callbacks: Partial<CallbacksOptions<GoogleProfile>>;
}

export const authOptions: AuthOptionsType = {
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
      connectDB();
      const user = await UserModel.findOne({ email: profile?.email });

      if (user === null) {
        await UserModel.create({
          email: profile?.email,
          username: profile?.name,
          image: profile?.picture,
        });
      }
      return true;
    },
    //Session callback function that modifies session object
    async session({ session }) {
      const user = await UserModel.findOne({ email: session.user?.email });
      const newSession = { ...session, user: { ...session.user, id: '' } };
      newSession.user!.id = user!._id.toString();
      return newSession as Session;
    },
  },
};
