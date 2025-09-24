import { connectDB } from '@/lib';
import { isValidId } from '@/utils/isValidId';
import { notFound } from 'next/navigation';
import { PropertyHeaderImage } from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import { paths } from '@/constants/paths';
import { FaArrowLeft } from 'react-icons/fa';
import { PropertyDetails } from '@/components/PropertyDetails/PropertyDetails';
import { Gallery } from '@/components/PropertyDetails/components/Gallery';
import { BookmarkButton } from '@/components/BookmarkButton';
import { ShareButtons } from '@/components/ShareButtons';
import { ContactForm } from '@/components/Forms/ContactForm';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { type Property as PropertyType } from '@/types/property';
import { getProperty } from '@/queries/getProperty';

interface Params {
  id: string;
}

export interface PropertyPageProps {
  params: Promise<Params>;
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { id } = await params;

  if (!isValidId(id)) {
    notFound();
  }

  await connectDB();
  const propertyDoc = await getProperty(id);

  if (propertyDoc === null) {
    notFound();
  }

  const property = convertToSerializableObject<PropertyType>(propertyDoc);

  return (
    <>
      <PropertyHeaderImage
        image={property.images[0]}
        city={property.location.city}
        type={property.type}
      />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href={paths.properties}
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft aria-hidden="true" className="mr-3" /> Back to
            Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton id={property._id} ownerId={property.owner} />
              <ShareButtons
                id={property._id}
                name={property.name}
                type={property.type}
              />
              <ContactForm ownerId={property.owner} propertyId={property._id} />
            </aside>
          </div>
        </div>
      </section>
      <Gallery
        images={property.images}
        city={property.location.city}
        type={property.type}
      />
    </>
  );
};

export default PropertyPage;
