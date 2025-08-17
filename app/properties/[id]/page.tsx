interface Params {
  id: string;
}

interface PropertyPageProps {
  params: Params;
}

const PropertyPage = ({ params }: PropertyPageProps) => {
  return <div>Property Page</div>;
};

export default PropertyPage;
