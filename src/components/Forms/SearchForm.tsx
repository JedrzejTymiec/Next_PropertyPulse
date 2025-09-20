'use client';
import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropertyType } from '@/types/proprtyType';
import { paths } from '@/constants/paths';
import { Select } from './components/Select/Select';
import { propertyTypeSelectOptions } from './constans/propertyTypes';
import { Input } from './components/Input';

interface SearchFormProps {
  initialSearch?: string;
  initialType?: PropertyType;
}

const searchSelectOptions = [{ value: 'All', label: 'All' }, ...propertyTypeSelectOptions];

export const SearchForm = ({ initialSearch, initialType }: SearchFormProps) => {
  const [location, setLocation] = useState<string>(initialSearch ?? '');
  const [propertyType, setPropertyType] = useState<PropertyType>(initialType ?? PropertyType.All);
  const router = useRouter();
  const searchParams = useSearchParams().toString();

  const handleLocationChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  }, []);
  const handleTypeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value as PropertyType);
  }, []);
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const query = new URLSearchParams(searchParams);
      query.set('search', location);
      query.set('type', propertyType);
      query.set('page', '1');
      router.push(`${paths.properties}?${query}`);
    },
    [location, propertyType, searchParams, router],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
      role="search"
    >
      <Input
        type="text"
        id="location"
        placeholder="Enter Location (City, State, Zip, etc)"
        value={location}
        onChange={handleLocationChange}
        className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0"
        variant="search"
      />
      <Select
        id="property-type"
        variant="search"
        className="w-full md:w-2/5 md:pl-2"
        options={searchSelectOptions}
        value={propertyType}
        onChange={handleTypeChange}
      />
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};
