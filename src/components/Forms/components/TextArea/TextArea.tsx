import { type ChangeEvent, useCallback, useState } from 'react';
import { textAreaVariants } from './textAreaVariants';

interface TextAreaProps {
  label: string;
  id: string;
  placeholder: string;
  rows: number;
  variant?: 'contact';
  initialValue?: string;
}

export const TextArea = ({
  label,
  id,
  placeholder,
  rows,
  initialValue,
  variant,
}: TextAreaProps) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  const handleOnChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={handleOnChange}
        id={id}
        name={id}
        className={textAreaVariants({ variant })}
        rows={rows}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
