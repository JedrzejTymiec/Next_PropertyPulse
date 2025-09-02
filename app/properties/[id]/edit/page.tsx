import { PropertyForm } from '@/components/PropertyForm/PropertyForm';
import Property from '@/models/Property';
import { connectDB } from '@/config/database';
import { PropertyPageProps } from '../page';
import { notFound } from 'next/navigation';

const EditPropertyPage = async ({ params: { id } }: PropertyPageProps) => {
  await connectDB();

  const property = await Property.findById(id);

  if (property === null) {
    notFound();
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyForm initialValue={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
