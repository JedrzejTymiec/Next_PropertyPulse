import { ProprtyType } from '@/types/proprtyType';
import { texts } from './texts';

export const propertyTypeSelectOptions = [
  {
    value: ProprtyType.Apartment,
    label: texts.PropertyTypeSelect.Option.Apartment,
  },
  { value: ProprtyType.Condo, label: texts.PropertyTypeSelect.Option.Condo },
  { value: ProprtyType.House, label: texts.PropertyTypeSelect.Option.House },
  {
    value: ProprtyType.CabinOrCottage,
    label: texts.PropertyTypeSelect.Option.CabinOrCottage,
  },
  { value: ProprtyType.Room, label: texts.PropertyTypeSelect.Option.Room },
  { value: ProprtyType.Studio, label: texts.PropertyTypeSelect.Option.Studio },
  { value: ProprtyType.Other, label: texts.PropertyTypeSelect.Option.Other },
];
