import { connectDB } from '@/config/database';
import Property from '@/models/Property';
import { isValidId } from '@/utils/isValidId';
import { notFound } from 'next/navigation';
import { PropertyHeaderImage } from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import { paths } from '@/constants/paths';
import { FaArrowLeft } from 'react-icons/fa';
import { PropertyDetails } from '@/components/PropertyDetails/PropertyDetails';

interface Params {
  id: string;
}

interface PropertyPageProps {
  params: Params;
}

const PropertyPage = async ({ params: { id } }: PropertyPageProps) => {
  if (!isValidId(id)) {
    notFound();
  }

  await connectDB();
  const property = await Property.findById(id).exec();

  if (property === null) {
    notFound();
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href={paths.properties}
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-3" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
