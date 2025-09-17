import { unstable_cache } from 'next/cache';
import { PropertyModel } from '@/models';
import { connectDB } from '@/lib';

export const getFeaturedProperties = unstable_cache(
  async () => {
    await connectDB();
    return await PropertyModel.find({ is_featured: true }).lean();
  },
  ['properties'],
  { revalidate: 86400 },
);
