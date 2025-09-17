import { PropertyType } from '@/types/proprtyType';
import { texts } from './texts';

export const propertyTypeSelectOptions = [
  {
    value: PropertyType.Apartment,
    label: texts.PropertyTypeSelect.Option.Apartment,
  },
  { value: PropertyType.Condo, label: texts.PropertyTypeSelect.Option.Condo },
  { value: PropertyType.House, label: texts.PropertyTypeSelect.Option.House },
  {
    value: PropertyType.CabinOrCottage,
    label: texts.PropertyTypeSelect.Option.CabinOrCottage,
  },
  { value: PropertyType.Room, label: texts.PropertyTypeSelect.Option.Room },
  { value: PropertyType.Studio, label: texts.PropertyTypeSelect.Option.Studio },
  { value: PropertyType.Chalet, label: texts.PropertyTypeSelect.Option.Chalet },
  { value: PropertyType.Other, label: texts.PropertyTypeSelect.Option.Other },
];
