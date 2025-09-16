import { type ChangeEvent } from 'react';
import { selectVariants } from './selectVariants';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  id: string;
  variant?: 'property' | 'search';
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  name?: string;
  required?: boolean;
  initialValue?: string;
  className?: string;
}

export const Select = ({
  id,
  options,
  label,
  name,
  required = true,
  initialValue,
  value,
  onChange,
  className,
  variant,
}: SelectProps) => {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        value={value}
        onChange={onChange}
        name={name ?? id}
        className={selectVariants({ variant })}
        defaultValue={initialValue}
        required={required}
        {...(label ? undefined : { 'aria-label': id })}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
