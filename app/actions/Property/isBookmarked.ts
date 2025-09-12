'use server';
import { connectDB } from '@/config/database';
import User from '@/models/User';
import { assertUser } from '@/utils/asserts/assertUser';
import { getSessionUser } from '@/utils/getSessionUser';

export async function isBookmarked(id: string) {
  await connectDB();
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);
  const user = await User.findById(sessionUser?.userId);

  return user?.bookmarks.some(bmrk => bmrk.equals(id));
}
