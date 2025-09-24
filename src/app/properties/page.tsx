import { SearchForm } from '@/components/Forms/SearchForm';
import { Pagination } from '@/components/Pagination';
import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { connectDB } from '@/lib';
import { getPagedProperties } from '@/queries/getPagedProperties';
import { type PropertyType } from '@/types';

interface PropertiesPageProps {
  searchParams: Promise<{
    search: string;
    type: PropertyType;
    page: string;
    size: string;
  }>;
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const {
    search,
    type,
    page: pageParam = '1',
    size: sizeParam = '9',
  } = await searchParams;
  await connectDB();
  const page = Number(pageParam);
  const size = Number(sizeParam);
  const skip = (page - 1) * size;
  const { properties, total } = await getPagedProperties(
    search,
    type,
    skip,
    size,
  );

  return (
    <>
      <h1 className="sr-only">Browse Properties</h1>
      <section className="bg-blue-700 py-4">
        <h2 className="sr-only">Search form</h2>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start ms:px-6 lg:px-8">
          <SearchForm initialSearch={search} initialType={type} />
        </div>
      </section>
      <section className="container-xl lg:container m-auto px-4 py-6">
        <h2 className="sr-only">List of results</h2>
        {properties.length === 0 ? (
          <p role="status">No properties found</p>
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
