import { connectDB } from '@/lib/connectDB';
import { PropertyModel } from '@/models/Property';
import { FeaturedPropertyCard } from '@/components/FeaturedProperties/FeaturedPropertyCard';
import { unstable_cache } from 'next/cache';
import { type Property } from '@/types/property';

export const FeaturedProperties = async () => {
  const getProperties = unstable_cache(
    async () => {
      await connectDB();
      return await PropertyModel.find({ is_featured: true }).lean();
    },
    ['properties'],
    { revalidate: 86400 },
  );
  const properties = await getProperties();
  return properties.length > 0 ? (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property: Property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};
