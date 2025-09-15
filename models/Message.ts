import { type Message as MessageType } from '@/types/message';
import { type HydratedDocument, Schema, model, models, type Model } from 'mongoose';

export type MessageDocument = HydratedDocument<MessageType>;

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: String,
    body: {
      type: String,
      required: [true, 'Body is required'],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const MessageModel: Model<MessageType> = models.Message || model('Message', MessageSchema);
