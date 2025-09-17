import { SearchForm } from '@/components/Forms/SearchForm';
import { Pagination } from '@/components/Pagination';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { connectDB } from '@/lib/connectDB';
import { PropertyModel } from '@/models/Property';
import { PropertyType } from '@/types/proprtyType';
import { type FilterQuery } from 'mongoose';

interface PropertiesPageProps {
  searchParams: {
    search: string;
    type: PropertyType;
    page: string;
    size: string;
  };
}

const PropertiesPage = async ({
  searchParams: { search, type, page: pageParam = '1', size: sizeParam = '9' },
}: PropertiesPageProps) => {
  await connectDB();
  let properties;
  const page = Number(pageParam);
  const size = Number(sizeParam);
  const skip = (page - 1) * size;
  let total;

  if (!search && !type) {
    properties = await PropertyModel.find({}).skip(skip).limit(size).lean();
    total = await PropertyModel.countDocuments();
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
    properties = await PropertyModel.find(query).skip(skip).limit(size).lean();
    total = await PropertyModel.countDocuments(query);
  }

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start ms:px-6 lg:px-8">
          <SearchForm initialSearch={search} initialType={type} />
        </div>
      </section>
      <section className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination page={page} pageSize={size} total={total} />
      </section>
    </>
  );
};

export default PropertiesPage;
