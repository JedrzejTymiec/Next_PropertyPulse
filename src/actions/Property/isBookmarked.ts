'use server';
import { connectDB, getSessionUser } from '@/lib';
import { getUser } from '@/queries';
import { assertUser } from '@/utils/asserts/assertUser';

export async function isBookmarked(id: string) {
  await connectDB();
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);
  const user = await getUser(sessionUser.userId);

  return user?.bookmarks.some(bmrk => bmrk.toString() === id);
}
