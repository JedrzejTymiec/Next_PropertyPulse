'use client';

import { addProperty } from '@/app/actions/addProperty';
import { Select } from './components/Select';
import { TextArea } from './components/TextArea';
import { Input } from './components/Input';
import { propertyTypeSelectOptions } from './constans/propertyTypes';
import { amenities } from './constans/amenities';
import { Amenity } from './components/Amenity';

export const PropertyAddForm = () => {
  return (
    <form action={addProperty}>
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>
      <Select label="Property Type" options={propertyTypeSelectOptions} />
      <Input
        type="text"
        id="name"
        placeholder="eg. Beautiful Apartment In Miami"
        label="Listing Name"
      />
      <TextArea
        id="description"
        label="Description"
        rows={4}
        placeholder="Add an optional description of your propert"
      />

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <Input
          type="text"
          id="street"
          name="location.street"
          placeholder="Street"
          className="mb-4"
        />
        <Input type="text" id="city" name="location.city" placeholder="City" />
        <Input
          type="text"
          id="state"
          name="location.state"
          placeholder="State"
          className="mb-4"
        />
        <Input
          type="text"
          id="zipcode"
          name="location.zipcode"
          placeholder="Zipcode"
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <Input
          type="number"
          id="beds"
          label="Beds"
          className="w-full sm:w-1/3 pr-2"
        />
        <Input
          type="number"
          id="baths"
          label="Baths"
          className="w-full sm:w-1/3 pr-2"
        />
        <Input
          type="number"
          id="square_feet"
          label="Square Feet"
          className="w-full sm:w-1/3 pr-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {amenities.map((amenity) => (
            <Amenity key={amenity.id} {...amenity} />
          ))}
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
          required
        />
      </div>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Property
        </button>
      </div>
    </form>
  );
};
