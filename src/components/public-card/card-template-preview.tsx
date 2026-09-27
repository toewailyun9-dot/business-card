import React, { useState } from "react";
import { CardTemplate, PublicCustomerData, PublicQrCardData } from "./template-types";
import { getTemplateComponent } from "./template-registry";

export const SAMPLE_PREVIEW_CUSTOMER: PublicCustomerData = {
  id: "preview-sample",
  name: "Alexander Wright",
  photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  jobTitle: "Creative Director",
  company: "Apex Innovation",
  phone: "+95 9 123 456 789",
  email: "alexander@apex.com",
  address: "Yangon, Myanmar",
  mapUrl: "https://maps.google.com",
  website: "https://apexinnovation.com",
  bio: "Architecting elevated brand identities and purposeful digital experiences.",
  socialLinks: [
    { id: "1", platform: "linkedin", url: "https://linkedin.com" },
    { id: "2", platform: "instagram", url: "https://instagram.com" },
    { id: "3", platform: "telegram", url: "https://t.me" },
    { id: "4", platform: "x", url: "https://x.com" },
  ],
};

interface CardTemplatePreviewProps {
  template: CardTemplate;
  customer?: PublicCustomerData;
  scale?: number;
  className?: string;
}

export function CardTemplatePreview({
  template,
  customer = SAMPLE_PREVIEW_CUSTOMER,
  className = "",
}: CardTemplatePreviewProps) {
  const [copied, setCopied] = useState(false);

  const mockQrCard: PublicQrCardData = {
    id: "preview-card",
    slug: "preview-demo",
    status: "ACTIVE",
    template,
  };

  const TemplateComponent = getTemplateComponent(template);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <TemplateComponent
        customer={customer}
        qrCard={mockQrCard}
        onShare={handleShare}
        copied={copied}
        isPreview={true}
      />
    </div>
  );
}
