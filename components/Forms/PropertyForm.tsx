'use client';
import { addProperty } from '@/app/actions/Property/addProperty';
import { Select } from './components/Select';
import { TextArea } from './components/TextArea';
import { Input } from './components/Input/Input';
import { propertyTypeSelectOptions } from './constans/propertyTypes';
import { amenities } from './constans/amenities';
import { Amenity } from './components/Amenity';
import { type Property } from '@/types/property';
import { updateProperty } from '@/app/actions/Property/updateProperty';
import { useCallback } from 'react';

interface PropertyFormProps {
  initialValue?: Property;
}

export const PropertyForm = ({ initialValue }: PropertyFormProps) => {
  const isEdit = initialValue !== undefined;

  const initialAmenities = amenities.map(amenity => {
    if (isEdit && initialValue?.amenities?.includes(amenity.value)) {
      return { ...amenity, defaultChecked: true };
    } else {
      return amenity;
    }
  });

  const handleAction = useCallback(
    (formData: FormData) => {
      return isEdit ? updateProperty(initialValue?._id ?? '', formData) : addProperty(formData);
    },
    [isEdit, initialValue?._id],
  );

  return (
    <form action={handleAction}>
      <h2 className="text-3xl text-center font-semibold mb-6">
        {isEdit ? 'Edit Property' : 'Add Property'}
      </h2>
      <Select
        id="type"
        label="Property Type"
        options={propertyTypeSelectOptions}
        initialValue={initialValue?.type}
      />
      <Input
        type="text"
        id="name"
        placeholder="eg. Beautiful Apartment In Miami"
        label={{ text: 'Listing Name' }}
        initialValue={initialValue?.name}
      />
      <TextArea
        id="description"
        label="Description"
        rows={4}
        placeholder="Add an optional description of your propert"
        initialValue={initialValue?.description}
      />

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <Input
          type="text"
          id="street"
          name="location.street"
          placeholder="Street"
          className="mb-4"
          initialValue={initialValue?.location.street}
        />
        <Input
          type="text"
          id="city"
          name="location.city"
          placeholder="City"
          initialValue={initialValue?.location.city}
          className="mb-4"
        />
        <Input
          type="text"
          id="state"
          name="location.state"
          placeholder="State"
          className="mb-4"
          initialValue={initialValue?.location.state}
        />
        <Input
          type="text"
          id="zipcode"
          name="location.zipcode"
          placeholder="Zipcode"
          initialValue={initialValue?.location.zipcode}
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <Input
          type="number"
          id="beds"
          label={{ text: 'Beds' }}
          className="w-full sm:w-1/3 pr-2"
          initialValue={initialValue?.beds.toString()}
        />
        <Input
          type="number"
          id="baths"
          label={{ text: 'Baths' }}
          className="w-full sm:w-1/3 pr-2"
          initialValue={initialValue?.baths.toString()}
        />
        <Input
          type="number"
          id="square_feet"
          label={{ text: 'Square Feet' }}
          className="w-full sm:w-1/3 pr-2"
          initialValue={initialValue?.square_feet.toString()}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {initialAmenities.map(amenity => (
            <Amenity key={amenity.id} {...amenity} />
          ))}
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Input
            type="number"
            id="weekly_rate"
            name="rates.weekly"
            initialValue={initialValue?.rates.weekly}
            label={{ text: 'Weekly', font: 'normal', color: 'black', placement: 'left' }}
          />
          <Input
            type="number"
            id="monthly_rate"
            name="rates.monthly"
            initialValue={initialValue?.rates.monthly}
            label={{ text: 'Monthly', font: 'normal', color: 'black', placement: 'left' }}
          />
          <Input
            type="number"
            id="nightly_rate"
            name="rates.nightly"
            initialValue={initialValue?.rates.nightly}
            label={{ text: 'Nightly', font: 'normal', color: 'black', placement: 'left' }}
          />
        </div>
      </div>

      <Input
        type="text"
        id="seller_name"
        name="seller_info.name"
        placeholder="Name"
        className="mb-4"
        label={{ text: 'Seller Name' }}
        initialValue={initialValue?.seller_info.name}
      />
      <Input
        type="text"
        id="seller_email"
        name="seller_info.email"
        placeholder="Email address"
        className="mb-4"
        label={{ text: 'Seller Email' }}
        initialValue={initialValue?.seller_info.email}
      />
      <Input
        type="text"
        id="seller_phone"
        name="seller_info.phone"
        placeholder="Phone"
        className="mb-4"
        label={{ text: 'Seller Phone' }}
        initialValue={initialValue?.seller_info.phone}
      />

      {isEdit ? null : (
        <Input
          type="file"
          id="images"
          label={{ text: 'Images (Select up to 4)' }}
          required={true}
          className="mb-4"
        />
      )}

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEdit ? 'Update Property' : 'Add Property'}
        </button>
      </div>
    </form>
  );
};
