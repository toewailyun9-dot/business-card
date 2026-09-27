import React from "react";
import { CardTemplate, TemplateMetadata, TemplateProps } from "./template-types";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { LuxuryTemplate } from "./templates/LuxuryTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { CreatorTemplate } from "./templates/CreatorTemplate";
import { FriendlyTemplate } from "./templates/FriendlyTemplate";

export const CARD_TEMPLATES: Record<CardTemplate, React.ComponentType<TemplateProps>> = {
  PROFESSIONAL: ProfessionalTemplate,
  LUXURY: LuxuryTemplate,
  CLASSIC: ClassicTemplate,
  CREATOR: CreatorTemplate,
  FRIENDLY: FriendlyTemplate,
};

export const TEMPLATE_LIST: TemplateMetadata[] = [
  {
    id: "PROFESSIONAL",
    name: "Professional",
    tagline: "Clean & Corporate",
    description: "Structured corporate identity with clean two-column grid and solid dark accents.",
    bestFor: "Corporate Employees, Executives & Consultants",
    badgeBg: "#EEF2FF",
    badgeText: "#4F46E5",
  },
  {
    id: "LUXURY",
    name: "Luxury",
    tagline: "Elegant & Editorial",
    description: "Deep charcoal palette with refined gold accents, fine typography, and high-end aura.",
    bestFor: "Founders, Real Estate, Jewelry & Luxury Brands",
    badgeBg: "#FEF3C7",
    badgeText: "#D97706",
  },
  {
    id: "CLASSIC",
    name: "Classic",
    tagline: "Traditional Printed Card",
    description: "Traditional physical business card composition with archival ribbon and clean framing.",
    bestFor: "Sales Executives & Traditional Enterprises",
    badgeBg: "#F5F5F4",
    badgeText: "#78716C",
  },
  {
    id: "CREATOR",
    name: "Creator",
    tagline: "Creative & Personal",
    description: "Bold hero portrait banner with prioritized social profiles and portfolio highlight.",
    bestFor: "Designers, Developers, Photographers & Creators",
    badgeBg: "#F3E8FF",
    badgeText: "#9333EA",
  },
  {
    id: "FRIENDLY",
    name: "Friendly",
    tagline: "Warm & Approachable",
    description: "Inviting rounded action cards with a soft emerald accent and human connection.",
    bestFor: "Freelancers, Coaches, Personal Services & Small Business",
    badgeBg: "#ECFDF5",
    badgeText: "#059669",
  },
];

export function getTemplateComponent(template?: CardTemplate | null): React.ComponentType<TemplateProps> {
  if (template && CARD_TEMPLATES[template]) {
    return CARD_TEMPLATES[template];
  }
  return CARD_TEMPLATES.PROFESSIONAL;
}
