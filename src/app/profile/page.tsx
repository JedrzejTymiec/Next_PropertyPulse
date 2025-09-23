import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import { ProfileProperties } from '@/components/ProfileProperties/ProfileProperties';
import { convertToSerializableObject } from '@/utils';
import { type Property as PropertyType } from '@/types/property';
import { getUserProperties } from '@/queries';
import { getSessionUser } from '@/lib';
import { assertUser } from '@/utils/asserts/assertUser';

const ProfilePage = async () => {
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);
  const { userId } = sessionUser;
  const properties = await getUserProperties(userId);

  return (
    <section aria-labelledby="profile-header" className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 id="profile-header" className="text-3xl font-bold mb-4">
            Your Profile
          </h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-24 w-24 rounded-full mx-auto md:mx-0"
                  src={sessionUser.user?.image ?? profileDefault}
                  width={96}
                  height={96}
                  alt="User picture"
                />
              </div>
              <dl className="text-2xl">
                <dt className="font-bold block">Name: </dt>{' '}
                <dd className="mb-4">{sessionUser.user?.name}</dd>
                <dt className="font-bold block">Email: </dt> <dd>{sessionUser.user?.email}</dd>
              </dl>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties
                initalProperties={convertToSerializableObject<PropertyType[]>(properties)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
