interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  id: string;
  label?: string;
  name?: string;
  required?: boolean;
  initialValue?: string;
  selectClassName?: string;
}

export const Select = ({
  id,
  options,
  label,
  name,
  required = true,
  initialValue,
  selectClassName = 'border rounded w-full py-2 px-3',
}: SelectProps) => {
  return (
    <div className="mb-4">
      {label ? (
        <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        name={name ?? id}
        className={selectClassName}
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
