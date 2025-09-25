import { Readable } from 'node:stream';
import { cloudinaryClient } from './cloudinary';
import { type ReadableStream } from 'node:stream/web';

export const uploadImages = async (images: File[]) => {
  const uploads = images.map(
    image =>
      new Promise<string>((resolve, reject) => {
        const upload = cloudinaryClient.uploader.upload_stream(
          { folder: 'propertypulse', resource_type: 'image' },
          (err, res) => (err ? reject(err) : resolve(res!.secure_url)),
        );

        const nodeStream = Readable.fromWeb(
          image.stream() as ReadableStream<Uint8Array>,
        );
        nodeStream.pipe(upload);
      }),
  );

  const settled = await Promise.allSettled(uploads);
  const imageUrls = settled
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  return imageUrls;
};
