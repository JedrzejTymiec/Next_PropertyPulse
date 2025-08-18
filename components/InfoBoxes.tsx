import { paths } from '@/constants/paths';
import { InfoBox } from './InfoBox/InfoBox';

export const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            title="For Renters"
            variant="gray"
            link={{ text: 'Browse Properties', href: paths.properties }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            title="For Property Owners"
            variant="blue"
            link={{ text: 'Add Property', href: paths.addProperty }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
