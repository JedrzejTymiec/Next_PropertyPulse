import { selectVariants } from './selectVariants';
import { type WithLabel } from '@/components/Forms/types/WithLabel';
import { type Control } from '@/components/Forms/types/Control';

interface Option {
  value: string;
  label: string;
}

interface BaseSelect {
  options: Option[];
  id: string;
  variant?: 'property' | 'search';
  name?: string;
  required?: boolean;
  className?: string;
}

type SelectProps = BaseSelect & Control<HTMLSelectElement> & WithLabel;

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
          {label.text}
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
        aria-required={required}
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
