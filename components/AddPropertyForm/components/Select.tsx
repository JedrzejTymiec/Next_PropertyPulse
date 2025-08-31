interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  label: string;
}

export const Select = ({ options, label }: SelectProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <select
        id="type"
        name="type"
        className="border rounded w-full py-2 px-3"
        required
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
