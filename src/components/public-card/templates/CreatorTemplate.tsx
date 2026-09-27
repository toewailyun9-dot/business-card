import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { TemplateProps } from "../template-types";
import { SocialIcon } from "../shared/social-icon";

export function CreatorTemplate({
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
    <div className="w-full max-w-[400px] bg-[#18181B] border border-[#27272A] rounded-3xl overflow-hidden shadow-2xl flex flex-col text-white">
      {/* Top Floating Action Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#27272A] text-[#A1A1AA] text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>{customer.jobTitle || "Creator"}</span>
        </div>

        <button
          onClick={onShare}
          type="button"
          aria-label="Share card"
          className="p-2 rounded-full bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#10B981]" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Hero Visual Area: Large Profile Portrait */}
      <div className="px-6 pt-3 pb-4 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-3xl overflow-hidden border-3 border-[#4F46E5] bg-[#27272A] p-1 shadow-xl">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-[#09090B] flex items-center justify-center text-2xl font-bold text-[#E4E4E7]">
              {customer.photo ? (
                <img
                  src={customer.photo}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{getInitials(customer.name)}</span>
              )}
            </div>
          </div>
          {/* Creator Badge */}
          <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#4F46E5] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
            LIVE
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          {customer.name}
        </h1>

        {customer.company && (
          <p className="text-xs text-[#A1A1AA] mt-1 font-medium">
            @{customer.company}
          </p>
        )}

        {customer.bio && (
          <p className="text-xs text-[#D4D4D8] mt-3 leading-relaxed max-w-xs bg-[#27272A]/60 py-2 px-3 rounded-xl border border-[#3F3F46]">
            {customer.bio}
          </p>
        )}
      </div>

      {/* Prominent Social Row (Creator Focus) */}
      {customer.socialLinks && customer.socialLinks.length > 0 && (
        <div className="px-6 py-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-2 text-center">
            Connect & Socials
          </p>
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#27272A] hover:bg-[#4F46E5] text-white text-xs font-medium border border-[#3F3F46] hover:border-[#4F46E5] transition-colors cursor-pointer"
                >
                  <SocialIcon platform={social.platform} className="w-3.5 h-3.5 fill-current" />
                  <span className="capitalize">{social.platform}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Creator Card Action Modules */}
      <div className="p-6 space-y-3">
        {/* Main Portfolio Link if provided */}
        {websiteHref && (
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-xs tracking-wide shadow-md transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Explore My Portfolio & Work</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>
        )}

        {/* Save Contact Primary CTA */}
        <a
          href={isPreview ? "#" : `/api/vcard/${qrCard.slug}`}
          download={!isPreview}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white hover:bg-[#E4E4E7] text-[#09090B] font-bold text-xs tracking-wide transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#4F46E5]" />
          <span>Save Contact File</span>
        </a>

        {/* Quick Contact Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <a
            href={`tel:${customer.phone}`}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-medium transition-colors"
          >
            <Phone className="w-4 h-4 mb-1 text-[#4F46E5]" />
            <span className="text-[11px]">Direct Call</span>
          </a>

          {customer.email ? (
            <a
              href={`mailto:${customer.email}`}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-medium transition-colors"
            >
              <Mail className="w-4 h-4 mb-1 text-[#4F46E5]" />
              <span className="text-[11px]">Email Me</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#27272A] text-[#71717A] text-xs font-medium opacity-40 cursor-not-allowed">
              <Mail className="w-4 h-4 mb-1" />
              <span className="text-[11px]">No Email</span>
            </div>
          )}

          {locationHref ? (
            <a
              href={locationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-medium transition-colors"
            >
              <MapPin className="w-4 h-4 mb-1 text-[#EF4444]" />
              <span className="text-[11px]">Location</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#27272A] text-[#71717A] text-xs font-medium opacity-40 cursor-not-allowed">
              <MapPin className="w-4 h-4 mb-1" />
              <span className="text-[11px]">Location</span>
            </div>
          )}
        </div>
      </div>

      {/* Creator Footer */}
      <footer className="bg-[#09090B] text-[#71717A] px-5 py-3 text-center border-t border-[#27272A] text-[11px] font-mono">
        {customer.website?.replace(/^https?:\/\//, "") || `${customer.name.toLowerCase().replace(/\s+/g, "")}.bio`}
      </footer>
    </div>
  );
}
