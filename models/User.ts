import { Schema, model, models, type Model, type Types } from 'mongoose';
import { type User as UserType } from '@/types/user';

type UserDocument = Omit<UserType, 'bookmarks'> & {
  bookmarks: Types.Array<Types.ObjectId>;
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User: Model<UserDocument> = models.User || model('User', UserSchema);

export default User;
