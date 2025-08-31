import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';
import { Session } from 'next-auth';

type MySession = Session & {
  user: {
    id: string;
  };
};

interface SeesionUser {
  user: Session['user'];
  userId: string;
}

export const getSessionUser = async (): Promise<SeesionUser | null> => {
  const session = (await getServerSession(authOptions)) as MySession;

  if (session === null || session.user === undefined) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
