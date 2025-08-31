'use client';

import { addProperty } from '@/app/actions/addProperty';
import { Select } from './components/Select';
import { TextArea } from './components/TextArea';
import { Input } from './components/TextInput';
import { propertyTypeSelectOptions } from './constans/propertyTypes';

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
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              value="Wifi"
              className="mr-2"
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="Full kitchen"
              className="mr-2"
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              className="mr-2"
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              className="mr-2"
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              className="mr-2"
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              className="mr-2"
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              className="mr-2"
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              className="mr-2"
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              className="mr-2"
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              className="mr-2"
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              className="mr-2"
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              className="mr-2"
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              className="mr-2"
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              className="mr-2"
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              className="mr-2"
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_high_speed_internet"
              name="amenities"
              value="High Speed Internet"
              className="mr-2"
            />
            <label htmlFor="amenity_high_speed_internet">
              High Speed Internet
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_outdoor_grill_bbq"
              name="amenities"
              value="Outdoor Grill/BBQ"
              className="mr-2"
            />
            <label htmlFor="amenity_outdoor_grill_bbq">Outdoor Grill/BBQ</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_fireplace"
              name="amenities"
              value="Fireplace"
              className="mr-2"
            />
            <label htmlFor="amenity_fireplace">Fireplace</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hiking_trials_access"
              name="amenities"
              value="Hiking Trials Access"
              className="mr-2"
            />
            <label htmlFor="amenity_hiking_trials_access">
              Hiking Trials Access
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pet_friendly"
              name="amenities"
              value="Pet Friendly"
              className="mr-2"
            />
            <label htmlFor="amenity_pet_friendly">Pet Friendly</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_beach_access"
              name="amenities"
              value="Beach Access"
              className="mr-2"
            />
            <label htmlFor="amenity_beach_access">Beach Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_ski_equipment_storage"
              name="amenities"
              value="Ski Equipment Storage"
              className="mr-2"
            />
            <label htmlFor="amenity_ski_equipment_storage">
              Ski Equipment Storage
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_moutain_view"
              name="amenities"
              value="Moutain View"
              className="mr-2"
            />
            <label htmlFor="amenity_moutain_view">Moutain View</label>
          </div>
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
