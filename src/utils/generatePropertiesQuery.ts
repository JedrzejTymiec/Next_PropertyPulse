import { PropertyType } from '@/types';
import { type FilterQuery } from 'mongoose';
import { type PropertyModel } from '@/models';

export const generatePropertiesQuery = (search: string, type: string) => {
  const searchPattern = new RegExp(search, 'i');
  const query: FilterQuery<typeof PropertyModel> = {
    $or: [
      { name: searchPattern },
      { description: searchPattern },
      { 'location.street': searchPattern },
      { 'location.city': searchPattern },
      { 'location.state': searchPattern },
      { 'location.zipcode': searchPattern },
    ],
  };
  if (type !== PropertyType.All) {
    const typePattern = new RegExp(type, 'i');
    query.type = typePattern;
  }
  return query;
};
