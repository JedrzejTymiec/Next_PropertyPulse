import { unstable_cache } from 'next/cache';
import { PropertyModel } from '@/models';
import { connectDB } from '@/lib';
import { CacheTag } from '@/constants/CacheTag';

export const getProperty = unstable_cache(
  async (id: string) => {
    await connectDB();
    return await PropertyModel.findById(id).lean();
  },
  [CacheTag.Property],
  { revalidate: 86400 },
);
