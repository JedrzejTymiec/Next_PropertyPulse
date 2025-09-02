interface AmenityProps {
  id: string;
  value: string;
}

export const Amenity = ({ id, value }: AmenityProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name="amenities"
        value={value}
        className="mr-2"
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};
