'use server';
import { connectDB, getSessionUser } from '@/lib';
import { UserModel } from '@/models';
import { assertUser } from '@/utils/asserts/assertUser';

export async function isBookmarked(id: string) {
  await connectDB();
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);
  const user = await UserModel.findById(sessionUser?.userId);

  return user?.bookmarks.some(bmrk => bmrk.equals(id));
}
