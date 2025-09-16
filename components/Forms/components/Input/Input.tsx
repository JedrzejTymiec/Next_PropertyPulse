import { type ChangeEvent, useCallback, useState } from 'react';
import { tv } from 'tailwind-variants';
import { clsx } from 'clsx';

interface Label {
  text: string;
  placement?: 'top' | 'left';
  font?: 'bold' | 'normal';
  color?: 'grey' | 'black';
}

interface InputProps {
  type: 'text' | 'number' | 'file';
  id: string;
  label?: Label;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  initialValue?: string | number;
}

const labelVariants = tv({
  base: 'block',
  variants: {
    font: { bold: 'font-bold', normal: 'font-normal' },
    placement: { left: 'mr-2', top: 'mb-2' },
    color: { grey: 'text-gray-700', black: 'text-black' },
  },
  defaultVariants: {
    font: 'bold',
    placement: 'top',
    color: 'grey',
  },
});

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
  const [value, setValue] = useState<string | number>(initialValue ?? '');
  const isLabelHorizontal = label?.placement === 'left';
  const isFileInput = type === 'file';

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  }, []);

  return (
    <div className={clsx(className, isLabelHorizontal ? 'flex items-center' : null)}>
      {label ? (
        <label
          htmlFor={id}
          className={labelVariants({
            placement: label.placement,
            font: label.font,
            color: label.color,
          })}
        >
          {label.text}
        </label>
      ) : null}
      <input
        value={value}
        onChange={handleOnChange}
        type={type}
        id={id}
        name={name ?? id}
        className="border rounded w-full py-2 px-3"
        placeholder={placeholder}
        required={required}
        {...(isFileInput ? { accept: 'image/*', multiple: true } : undefined)}
        {...(label ? undefined : { 'aria-label': id })}
      />
    </div>
  );
};
