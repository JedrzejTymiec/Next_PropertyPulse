import { paths } from '@/constants/paths';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMapMarker } from 'react-icons/fa';
import { type Property } from '@/types/property';
import { createUrl } from '@/utils/createUrl';
import { generateAltText } from '@/utils/generateAltText';
import { DisplayRate } from './components/DisplayRate';
import { AvailableRentalTypes } from './components/AvailableRentalTypes';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const { images, type, name, beds, baths, square_feet, location, _id, rates } = property;

  return (
    <Link href={createUrl(paths.property, { id: _id })}>
      <article className="rounded-xl shadow-md relative">
        <Image
          src={images[0]}
          alt={generateAltText(location.city, type)}
          width="1280"
          height="720"
          sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
          className="w-full h-auto rounded-t-xl"
        />
        <div className="p-4">
          <div className="text-left md:text-center lg:text-left mb-6">
            <p className="text-gray-600">{type}</p>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <DisplayRate rates={rates} />
          <ul
            className="flex justify-center gap-4 text-gray-500 mb-4"
            aria-label="property-details"
          >
            <li>
              <FaBed className="md:hidden lg:inline" aria-hidden="true" /> {beds}
              <span className="md:hidden lg:inline">Beds</span>
            </li>
            <li>
              <FaBath className="md:hidden lg:inline" aria-hidden="true" /> {baths}
              <span className="md:hidden lg:inline">Baths</span>
            </li>
            <li>
              <FaRulerCombined className="md:hidden lg:inline" aria-hidden="true" />
              {square_feet} <span className="md:hidden lg:inline">sqft</span>
            </li>
          </ul>
          <AvailableRentalTypes rates={rates} />
          <div className="border border-gray-100 mb-5"></div>
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <FaMapMarker className="text-orange-700 mt-1" aria-hidden="true" />
              <p aria-label="location" className="text-orange-700">
                {location.city} {location.state}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              Details
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
