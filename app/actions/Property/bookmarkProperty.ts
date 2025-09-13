'use server';
import { connectDB } from '@/config/database';
import { paths } from '@/constants/paths';
import { Entity } from '@/constants/Entity';
import { NotFoundException } from '@/exceptions/NotFoundException';
import User from '@/models/User';
import { assertUser } from '@/utils/asserts/assertUser';
import { getSessionUser } from '@/utils/getSessionUser';
import { isValidId } from '@/utils/isValidId';
import { revalidatePath } from 'next/cache';

export async function bookmarkProperty(id: string) {
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);

  if (!isValidId(id)) {
    throw new NotFoundException(Entity.Property);
  }

  await connectDB();
  const { userId } = sessionUser;
  const user = await User.findById(userId);
  const isBookmarked = user!.bookmarks?.some(bmrk => bmrk.equals(id));
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
