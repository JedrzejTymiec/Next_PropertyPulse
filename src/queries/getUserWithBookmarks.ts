import { unstable_cache } from 'next/cache';
import { UserModel } from '@/models';
import { connectDB } from '@/lib';
import { CacheTag } from '@/constants/CacheTag';

export const getUserWithBookmarks = unstable_cache(
  async (id: string) => {
    await connectDB();
    return await UserModel.findById(id).populate('bookmarks').lean();
  },
  [CacheTag.User],
  { revalidate: 86400 },
);
