import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib';
import { PropertyModel } from '@/models';

export const getUserProperties = unstable_cache(
  async (id: string) => {
    await connectDB();
    return await PropertyModel.find({ owner: id });
  },
  ['properties'],
  { revalidate: 86400 },
);
