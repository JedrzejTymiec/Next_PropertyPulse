interface AmenityProps {
  id: string;
  value: string;
  defaultChecked?: boolean;
}

export const Amenity = ({ id, value, defaultChecked }: AmenityProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name="amenities"
        value={value}
        className="mr-2"
        defaultChecked={defaultChecked}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};
