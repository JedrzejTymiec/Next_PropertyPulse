import { PropertyForm } from '@/components/Forms/PropertyForm';

const AddPropertyPage = () => {
  return (
    <section aria-labelledby="form-header" className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
