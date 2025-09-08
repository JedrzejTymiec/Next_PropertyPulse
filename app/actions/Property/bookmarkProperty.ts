'use server';
import { connectDB } from '@/config/database';
import { paths } from '@/constants/paths';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { isValidId } from '@/utils/isValidId';
import { revalidatePath } from 'next/cache';

export async function bookmarkProperty(id: string) {
  const sesionUser = await getSessionUser();

  if (!sesionUser || !sesionUser.userId) {
    throw new Error('User id required');
  }
  if (!isValidId(id)) {
    throw new Error('Property not found');
  }

  await connectDB();
  const { userId } = sesionUser;
  const user = await User.findById(userId);
  const isBookmarked = user!.bookmarks?.some((bmrk) => bmrk.equals(id));
  let message;

  if (isBookmarked) {
    user?.bookmarks?.pull(id);
    message = 'Bookmark removed';
  } else {
    user?.bookmarks?.push(id);
    message = 'Bookmark added';
  }

  await user?.save();
  revalidatePath(paths.savedProperties, 'page');

  return message;
}
