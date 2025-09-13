import { type Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill } from 'react-icons/fa';
import { getRateDisplay } from '../PropertyCard/utils';
import { paths } from '@/constants/paths';
import { createUrl } from '@/utils/createUrl';

interface FreaturedPropertyCardProps {
  property: Property;
}

export const FeaturedPropertyCard = ({ property }: FreaturedPropertyCardProps) => {
  const { images, name, type, rates, beds, baths, square_feet, location, _id } = property;
  const displayRate = getRateDisplay(rates);
  return (
    <Link
      href={createUrl(paths.property, { id: _id })}
      className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
    >
      <Image
        src={images[0]}
        alt=""
        className="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
        width="0"
        height="0"
        sizes="100vw"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="text-gray-600 mb-4">{type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {displayRate}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" /> {beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />
            {square_feet} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {/* TODO: map rates correctly */}
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> Nightly
          </p>
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> Weekly
          </p>
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <span className="text-orange-700">
              {' '}
              {location.city} {location.state}
            </span>
          </div>
          <div className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
            Details
          </div>
        </div>
      </div>
    </Link>
  );
};
