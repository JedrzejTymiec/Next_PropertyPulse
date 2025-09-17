import mongoose from 'mongoose';

let connected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (connected) {
    // eslint-disable-next-line no-console
    console.error('MongoBD already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI ?? '');
    connected = true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
