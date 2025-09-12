import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { type SessionUser } from '../getSessionUser';

export function assertUser(sessionUser: SessionUser | null): asserts sessionUser is SessionUser {
  if (!sessionUser?.userId) {
    throw new UnauthorizedException();
  }
}
