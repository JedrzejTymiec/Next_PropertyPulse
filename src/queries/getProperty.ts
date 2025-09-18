import { unstable_cache } from 'next/cache';
import { UserModel } from '@/models';
import { connectDB } from '@/lib';
import { CacheTag } from '@/constants/CacheTag';

export const getProperty = unstable_cache(
  async (id: string) => {
    await connectDB();
    return await UserModel.findById(id);
  },
  [CacheTag.Property],
  { revalidate: 86400 },
);
