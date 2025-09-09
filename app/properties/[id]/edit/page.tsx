import { PropertyForm } from '@/components/Forms/PropertyForm';
import PropertyModel from '@/models/Property';
import { connectDB } from '@/config/database';
import { type PropertyPageProps } from '../page';
import { notFound } from 'next/navigation';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { type Property } from '@/types/property';

const EditPropertyPage = async ({ params: { id } }: PropertyPageProps) => {
  await connectDB();

  const property = await PropertyModel.findById(id);

  if (property === null) {
    notFound();
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyForm
            initialValue={convertToSerializableObject<Property>(property)}
          />
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
