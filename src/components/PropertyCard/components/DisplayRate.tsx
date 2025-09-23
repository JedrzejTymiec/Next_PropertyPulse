import { getRateDisplay } from '@/components/PropertyCard/utils';
import { type Rates } from '@/types';

interface DisplayRateProps {
  rates: Rates;
}

export const DisplayRate = ({ rates }: DisplayRateProps) => {
  const displayRate = getRateDisplay(rates);
  return (
    <div className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
      <data value={displayRate.value}>{displayRate.text}</data>
      {displayRate.time}
    </div>
  );
};
