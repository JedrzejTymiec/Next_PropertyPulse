import { type Property } from '@/types/property';
import { FaBed, FaBath, FaRulerCombined, FaCheck, FaMapMarker } from 'react-icons/fa';
import { Rate } from './components/Rate';
import { Map } from './components/Map';

interface PropertyDetailsProps {
  property: Property;
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const { name, type, location, rates, beds, baths, square_feet, description, amenities } =
    property;
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{type}</div>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div className="text-orange-700 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker aria-hidden="true" className="mt-1 mr-1" />
          <p>{`${location.street} ${location.city}, ${location.state} ${location.zipcode}`}</p>
        </div>

        <h2 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">Rates & Options</h2>
        <div className="flex flex-col md:flex-row justify-around">
          <Rate text="Nightly" rate={rates.nightly} />
          <Rate text="Weekly" rate={rates.weekly} />
          <Rate text="Monthly" rate={rates.monthly} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-bold mb-6">Description & Details</h2>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <FaBed aria-hidden="true" className="inline-block mr-2" />
            <span className="hidden sm:inline">{beds} Beds</span>
          </p>
          <p>
            <FaBath aria-hidden="true" className="inline-block mr-2" />
            <span className="hidden sm:inline">{baths} Baths</span>
          </p>
          <p>
            <FaRulerCombined aria-hidden="true" className="inline-block mr-2" />
            <span className="hidden sm:inline">{square_feet} sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4">{description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-bold mb-6">Amenities</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {amenities?.map(amenity => (
            <li key={amenity}>
              <FaCheck aria-hidden="true" className="inline-block mr-2" />
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <Map property={property} />
      </div>
    </main>
  );
};
