export type CardTemplate =
  | "PROFESSIONAL"
  | "LUXURY"
  | "CLASSIC"
  | "CREATOR"
  | "FRIENDLY";

export interface PublicSocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface PublicCustomerData {
  id: string;
  name: string;
  photo?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  phone: string;
  email?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  website?: string | null;
  bio?: string | null;
  socialLinks: PublicSocialLink[];
}

export interface PublicQrCardData {
  id: string;
  slug: string;
  status: string;
  template: CardTemplate;
}

export interface TemplateProps {
  customer: PublicCustomerData;
  qrCard: PublicQrCardData;
  onShare: () => void;
  copied: boolean;
  isPreview?: boolean;
}

export interface TemplateMetadata {
  id: CardTemplate;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  badgeBg: string;
  badgeText: string;
}
