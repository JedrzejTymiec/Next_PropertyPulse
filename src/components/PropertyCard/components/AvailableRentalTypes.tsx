import { type Rates } from '@/types';
import { RentalType } from './RentalType';
import { type RentalType as RentalTypeEnum } from '@/constants/RentalType';

type RateType = keyof Rates;

interface AvailableRentalTypesProps {
  rates: Rates;
}

export const AvailableRentalTypes = ({ rates }: AvailableRentalTypesProps) => {
  const rentalTypes = Object.keys(rates) as Array<keyof Rates>;
  const availableRentalTypes = rentalTypes.filter(type => rates[type as RateType] !== null);
  return (
    <ul
      className="flex justify-center gap-4 text-green-900 text-sm mb-4"
      aria-label="property-rental-types"
    >
      {availableRentalTypes.map(type => (
        <RentalType key={type} type={type as RentalTypeEnum} />
      ))}
    </ul>
  );
};
