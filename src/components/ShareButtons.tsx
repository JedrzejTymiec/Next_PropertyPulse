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
      <h2 className="text-xl font-bold text-center pt-2">Share This Property:</h2>
      <div className="flex gap-3 justify-center pt-2">
        <FacebookShareButton url={shareUrl} hashtag={hashtag} aria-label="Share on Facebook">
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={name}
          hashtags={[hashtag]}
          aria-label="Share on X"
        >
          <XIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={name} aria-label="Share on Whatsapp">
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject={name} aria-label="Share via email">
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
