'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

interface ShareButtonsProps {
  id: string;
  name: string;
  type: string;
}

export const ShareButtons = ({ id, name, type }: ShareButtonsProps) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${id}`;
  const hashtag = `${type}ForRent`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pt-2">
        <FacebookShareButton url={shareUrl} hashtag={hashtag}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={name} hashtags={[hashtag]}>
          <XIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={name}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject={name}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
