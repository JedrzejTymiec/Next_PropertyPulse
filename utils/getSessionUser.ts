import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';
import { type Session } from 'next-auth';

type MySession = Session & {
  user: {
    id: string;
  };
};

export interface SessionUser {
  user: Session['user'];
  userId: string;
}

export const getSessionUser = async (): Promise<SessionUser | null> => {
  const session = (await getServerSession(authOptions)) as MySession;

  if (session === null || session.user === undefined) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
