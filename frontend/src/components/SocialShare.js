import React from "react";
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";

export default function SocialShare({pet}) {
  const shareURL = window.location.href;
  const shareMessage = `
Meet ${pet?.petName}! 🐾
A ${pet?.breed} looking for a loving home.
🐶 Age: ${pet?.age}yrs
❤️ Personality: [Friendly traits, e.g., 'Good with children and other pets']
📍 Location: ${pet?.city} , ${pet?.state}
  
Ready to give ${pet?.petName} a forever home? Click the link to learn more and adopt!
👉 ${shareURL}`;

  

  return (
    <div className="flex flex-col gap-2">
      <FacebookShareButton url={shareURL} quote={shareMessage}>
        <FacebookIcon
          size={26}
          round
          className="hover:relative hover:right-2"
        />
      </FacebookShareButton>

      <WhatsappShareButton url={shareURL} title={shareMessage}>
        <WhatsappIcon
          size={26}
          round
          className="hover:relative hover:right-2"
        />
      </WhatsappShareButton>

      <EmailShareButton
        url={shareURL}
        subject="Interesting Link"
        body={shareMessage}
      >
        <EmailIcon size={26} round className="hover:relative hover:right-2" />
      </EmailShareButton>

      <PinterestShareButton
        url={shareURL}
        media={shareURL}
        description={shareMessage}
      >
        <PinterestIcon
          size={26}
          round
          className="hover:relative hover:right-2"
        />
      </PinterestShareButton>

      <TelegramShareButton url={shareURL} title={shareMessage}>
        <TelegramIcon
          size={26}
          round
          className="hover:relative hover:right-2"
        />
      </TelegramShareButton>

      <TwitterShareButton url={shareURL} title={shareMessage}>
        <TwitterIcon size={26} round className="hover:relative hover:right-2" />
      </TwitterShareButton>
    </div>
  );
}
