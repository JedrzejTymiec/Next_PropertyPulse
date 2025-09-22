import { type Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMapMarker } from 'react-icons/fa';
import { paths } from '@/constants/paths';
import { createUrl } from '@/utils/createUrl';
import { generateAltText } from '@/utils/generateAltText';
import { DisplayRate } from './components/DisplayRate';
import { AvailableRentalTypes } from './components/AvailableRentalTypes';

interface FreaturedPropertyCardProps {
  property: Property;
}

export const FeaturedPropertyCard = ({ property }: FreaturedPropertyCardProps) => {
  const { images, name, type, rates, beds, baths, square_feet, location, _id } = property;
  return (
    <Link href={createUrl(paths.property, { id: _id })}>
      <article className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
        <Image
          src={images[0]}
          alt={generateAltText(location.city, type)}
          className="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5 object-cover"
          width="1280"
          height="720"
          sizes="100vw"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600 mb-4">{type}</p>
          <DisplayRate rates={rates} />
          <ul
            className="flex justify-center gap-4 text-gray-500 mb-4"
            aria-label="property-details"
          >
            <li>
              <FaBed className="md:hidden lg:inline" /> {beds}
              <span className="md:hidden lg:inline">Beds</span>
            </li>
            <li>
              <FaBath className="md:hidden lg:inline" /> {baths}
              <span className="md:hidden lg:inline">Baths</span>
            </li>
            <li>
              <FaRulerCombined className="md:hidden lg:inline" />
              {square_feet} <span className="md:hidden lg:inline">sqft</span>
            </li>
          </ul>
          <AvailableRentalTypes rates={rates} />
          <div className="border border-gray-200 mb-5"></div>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <FaMapMarker className="text-orange-700 mt-1" />
              <p className="text-orange-700">
                {location.city} {location.state}
              </p>
            </div>
            <span className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
              Details
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
