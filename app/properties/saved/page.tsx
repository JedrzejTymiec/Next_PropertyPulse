import { PropertyCard } from '@/components/PropertyCard/PropertyCard';
import { connectDB } from '@/config/database';
import User from '@/models/User';
import { type Property } from '@/types/property';
import { getSessionUser } from '@/utils/getSessionUser';

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('Unauthorized');
  }

  await connectDB();
  const { userId } = sessionUser;
  const user = await User.findById(userId).populate('bookmarks');

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {user?.bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user?.bookmarks.map((bookmarked) => (
              <PropertyCard
                key={bookmarked._id.toString()}
                property={bookmarked as unknown as Property}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
