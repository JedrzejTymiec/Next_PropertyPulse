import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { connectDB } from '@/config/database';
import PropertyModel from '@/models/Property';
import { PropertyType } from '@/types/proprtyType';
import { type FilterQuery } from 'mongoose';

interface PropertiesPageProps {
  searchParams: {
    search: string;
    type: PropertyType;
  };
}

const PropertiesPage = async ({
  searchParams: { search, type },
}: PropertiesPageProps) => {
  await connectDB();
  let properties;

  if (!search && !type) {
    properties = await PropertyModel.find({}).lean();
  } else {
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
    properties = await PropertyModel.find(query);
  }

  return (
    <section className="container-xl lg:container m-auto px-4 py-6">
      {properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PropertiesPage;
