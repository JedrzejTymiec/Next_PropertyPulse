import { unstable_cache } from 'next/cache';
import { PropertyModel } from '@/models';
import { connectDB } from '@/lib';
import { CacheTag } from '@/constants/CacheTag';

export const getProperties = unstable_cache(
  async () => {
    await connectDB();
    return await PropertyModel.find().lean();
  },
  [CacheTag.Properties],
  { revalidate: 86400 },
);
