import { FaMoneyBill } from 'react-icons/fa';
import { type RentalType as RentalTypeEnum } from '@/constants/RentalType';
import { texts } from './texts';

interface RentalTypeProps {
  type: RentalTypeEnum;
}

export const RentalType = ({ type }: RentalTypeProps) => {
  return (
    <p>
      <FaMoneyBill className="md:hidden lg:inline lg:mr-2" />
      {texts.RentalType[type]}
    </p>
  );
};
