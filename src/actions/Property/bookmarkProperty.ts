'use server';
import { connectDB, getSessionUser } from '@/lib';
import { Entity } from '@/constants/Entity';
import { NotFoundException } from '@/exceptions';
import { assertUser } from '@/utils/asserts/assertUser';
import { isValidId } from '@/utils';
import { revalidateTag } from 'next/cache';
import { CacheTag } from '@/constants/CacheTag';
import { UserModel } from '@/models';

export async function bookmarkProperty(id: string) {
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);

  if (!isValidId(id)) {
    throw new NotFoundException(Entity.Property);
  }

  await connectDB();
  const { userId } = sessionUser;
  const user = await UserModel.findById(userId);
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
  revalidateTag(CacheTag.User);
  revalidateTag(CacheTag.Property);

  return message;
}
