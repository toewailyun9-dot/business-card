import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Share2,
  Check,
  Crown,
  Sparkles,
} from "lucide-react";
import { TemplateProps } from "../template-types";
import { SocialIcon } from "../shared/social-icon";

export function LuxuryTemplate({
  customer,
  qrCard,
  onShare,
  copied,
  isPreview = false,
}: TemplateProps) {
  const websiteHref = customer.website
    ? customer.website.startsWith("http")
      ? customer.website
      : `https://${customer.website}`
    : null;

  const locationHref = customer.mapUrl || (customer.address ? `https://maps.google.com/?q=${encodeURIComponent(customer.address)}` : null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full max-w-[400px] bg-[#09090B] border border-[#27272A] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-[#F4F4F5] tracking-wide">
      {/* 1. Luxury Gold Accent Trim */}
      <div className="h-1 bg-[#D97706] w-full" />

      {/* Top Header */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#18181B]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#18181B] border border-[#D97706]/40 flex items-center justify-center text-[#D97706]">
            <Crown className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A1A1AA]">
            {customer.company || "Private Client"}
          </span>
        </div>

        <button
          onClick={onShare}
          type="button"
          aria-label="Share card"
          className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#D97706] border border-[#27272A] transition-colors shrink-0 flex items-center gap-1.5 text-[11px] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[#10B981] font-mono text-[10px]">COPIED</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span className="tracking-widest uppercase text-[10px]">SHARE</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Portrait & Title Area */}
      <div className="px-6 pt-8 pb-5 flex flex-col items-center text-center">
        {/* Diamond / Architectural Photo Frame */}
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-2xl bg-[#18181B] p-1 border border-[#D97706]/60 shadow-lg relative">
            <div className="w-full h-full rounded-xl overflow-hidden bg-[#121214] flex items-center justify-center text-xl font-serif text-[#D97706]">
              {customer.photo ? (
                <img
                  src={customer.photo}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="tracking-widest">{getInitials(customer.name)}</span>
              )}
            </div>
            {/* Subtle Gold Corner Pins */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#D97706]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#D97706]" />
          </div>
        </div>

        {/* Customer Name */}
        <h1 className="text-2xl font-serif font-normal text-[#FAFAFA] tracking-wider uppercase">
          {customer.name}
        </h1>

        {customer.jobTitle && (
          <p className="text-xs font-light text-[#D97706] tracking-[0.18em] uppercase mt-1.5">
            {customer.jobTitle}
          </p>
        )}

        <div className="w-12 h-px bg-[#27272A] my-4" />

        {customer.bio && (
          <p className="text-xs font-light text-[#A1A1AA] leading-relaxed max-w-xs italic">
            &ldquo;{customer.bio}&rdquo;
          </p>
        )}
      </div>

      {/* 3. Luxury Information Rows */}
      <div className="px-6 py-4 border-t border-[#18181B] bg-[#0C0C0E] space-y-3">
        <div className="flex items-center justify-between text-xs py-1 border-b border-[#18181B]">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#71717A]">Direct Phone</span>
          <a
            href={`tel:${customer.phone}`}
            className="font-mono text-[#FAFAFA] hover:text-[#D97706] transition-colors"
          >
            {customer.phone}
          </a>
        </div>

        {customer.email && (
          <div className="flex items-center justify-between text-xs py-1 border-b border-[#18181B]">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#71717A]">Private Email</span>
            <a
              href={`mailto:${customer.email}`}
              className="text-[#FAFAFA] hover:text-[#D97706] transition-colors truncate max-w-[200px]"
            >
              {customer.email}
            </a>
          </div>
        )}

        {customer.company && (
          <div className="flex items-center justify-between text-xs py-1 border-b border-[#18181B]">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#71717A]">Organization</span>
            <span className="text-[#FAFAFA] truncate max-w-[200px]">{customer.company}</span>
          </div>
        )}

        {websiteHref && (
          <div className="flex items-center justify-between text-xs py-1 border-b border-[#18181B]">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#71717A]">Portfolio</span>
            <a
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D97706] hover:underline truncate max-w-[200px]"
            >
              {customer.website?.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {locationHref && (
          <div className="flex items-center justify-between text-xs py-1 border-b border-[#18181B]">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#71717A]">Residence / Office</span>
            <a
              href={locationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAFAFA] hover:text-[#D97706] transition-colors truncate max-w-[200px]"
            >
              {customer.address || "View on Map"}
            </a>
          </div>
        )}
      </div>

      {/* 4. Luxury Action Controls */}
      <div className="p-6 space-y-3">
        <a
          href={isPreview ? "#" : `/api/vcard/${qrCard.slug}`}
          download={!isPreview}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-black font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Save Contact File</span>
        </a>

        <div className="grid grid-cols-4 gap-2">
          <a
            href={`tel:${customer.phone}`}
            className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#121214] hover:bg-[#18181B] border border-[#27272A] text-[#FAFAFA] text-[10px] tracking-wider uppercase transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mb-1 text-[#D97706]" />
            <span>Call</span>
          </a>

          {customer.email ? (
            <a
              href={`mailto:${customer.email}`}
              className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#121214] hover:bg-[#18181B] border border-[#27272A] text-[#FAFAFA] text-[10px] tracking-wider uppercase transition-colors"
            >
              <Mail className="w-3.5 h-3.5 mb-1 text-[#D97706]" />
              <span>Email</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#121214] border border-[#27272A] text-[#52525B] text-[10px] tracking-wider uppercase opacity-40 cursor-not-allowed">
              <Mail className="w-3.5 h-3.5 mb-1" />
              <span>Email</span>
            </div>
          )}

          {websiteHref ? (
            <a
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#121214] hover:bg-[#18181B] border border-[#27272A] text-[#FAFAFA] text-[10px] tracking-wider uppercase transition-colors"
            >
              <Globe className="w-3.5 h-3.5 mb-1 text-[#D97706]" />
              <span>Web</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#121214] border border-[#27272A] text-[#52525B] text-[10px] tracking-wider uppercase opacity-40 cursor-not-allowed">
              <Globe className="w-3.5 h-3.5 mb-1" />
              <span>Web</span>
            </div>
          )}

          {locationHref ? (
            <a
              href={locationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#121214] hover:bg-[#18181B] border border-[#27272A] text-[#FAFAFA] text-[10px] tracking-wider uppercase transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 mb-1 text-[#D97706]" />
              <span>Map</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#121214] border border-[#27272A] text-[#52525B] text-[10px] tracking-wider uppercase opacity-40 cursor-not-allowed">
              <MapPin className="w-3.5 h-3.5 mb-1" />
              <span>Map</span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Minimalist Social Icons */}
      {customer.socialLinks && customer.socialLinks.length > 0 && (
        <div className="px-6 py-3 border-t border-[#18181B] bg-[#0A0A0C]">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {customer.socialLinks.map((social) => {
              const targetUrl = social.url.startsWith("http")
                ? social.url
                : `https://${social.url}`;

              return (
                <a
                  key={social.id}
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="w-8 h-8 rounded-lg bg-[#121214] hover:bg-[#D97706] text-[#A1A1AA] hover:text-black border border-[#27272A] hover:border-[#D97706] flex items-center justify-center transition-all cursor-pointer"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Gold Signature Footer */}
      <footer className="bg-[#09090B] text-[#71717A] px-5 py-3 text-center border-t border-[#18181B]">
        <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-[0.25em] uppercase">
          <Sparkles className="w-3 h-3 text-[#D97706]" />
          <span>{customer.company || "Exclusive Membership"}</span>
        </div>
      </footer>
    </div>
  );
}
