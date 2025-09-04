import { ChangeEvent, useCallback, useState } from 'react';

interface InputProps {
  type: 'text' | 'number';
  id: string;
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  initialValue?: string;
}

export const Input = ({
  label,
  placeholder,
  id,
  name,
  type,
  required = true,
  className,
  initialValue,
}: InputProps) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  }, []);

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
      ) : null}
      <input
        value={value}
        onChange={handleOnChange}
        type={type}
        id={id}
        name={name ?? id}
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder={placeholder}
        required={required}
        {...(label ? undefined : { 'aria-label': id })}
      />
    </div>
  );
};
