import { FaMoneyBill } from 'react-icons/fa';
import { type RentalType as RentalTypeEnum } from '@/constants/RentalType';
import { texts } from '@/components/PropertyCard/texts';

interface RentalTypeProps {
  type: RentalTypeEnum;
}

export const RentalType = ({ type }: RentalTypeProps) => {
  return (
    <li>
      <FaMoneyBill className="md:hidden lg:inline lg:mr-2" aria-hidden="true" />
      {texts.RentalType[type]}
    </li>
  );
};
