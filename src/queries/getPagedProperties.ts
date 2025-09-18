import { unstable_cache } from 'next/cache';
import { PropertyModel } from '@/models';
import { connectDB } from '@/lib';
import { generatePropertiesQuery } from '@/utils/generatePropertiesQuery';

export const getPagedProperties = unstable_cache(
  async (search: string, type: string, skip: number, size: number) => {
    await connectDB();
    let properties;
    let total;
    if (!search && !type) {
      properties = await PropertyModel.find({}).skip(skip).limit(size).lean();
      total = await PropertyModel.countDocuments();
    } else {
      const query = generatePropertiesQuery(search, type);
      properties = await PropertyModel.find(query).skip(skip).limit(size).lean();
      total = await PropertyModel.countDocuments(query);
    }
    return { properties, total };
  },
  ['properties'],
  { revalidate: 86400 },
);
