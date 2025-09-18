import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib';
import { PropertyModel } from '@/models';
import { CacheTag } from '@/constants/CacheTag';

export const getUserProperties = unstable_cache(
  async (id: string) => {
    await connectDB();
    return await PropertyModel.find({ owner: id }).lean();
  },
  [CacheTag.Properties],
  { revalidate: 86400 },
);
