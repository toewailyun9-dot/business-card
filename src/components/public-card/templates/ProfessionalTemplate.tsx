import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Share2,
  Check,
  Building,
} from "lucide-react";
import { TemplateProps } from "../template-types";
import { SocialIcon } from "../shared/social-icon";

export function ProfessionalTemplate({
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
    <div className="w-full max-w-[400px] bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm flex flex-col text-[#0F172A]">
      {/* 1. Brand Header */}
      <header className="bg-[#0F172A] text-white px-5 py-4 flex items-center justify-between border-b border-[#1E293B] relative z-10">
        <div className="flex items-center gap-2.5 truncate pr-2">
          <div className="w-7 h-7 rounded-lg bg-[#DC2626] text-white flex items-center justify-center shrink-0 font-bold text-xs">
            <Building className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="font-bold text-xs uppercase tracking-wider block text-white truncate">
              {customer.company || "Digital Business Card"}
            </span>
            <span className="text-[10px] text-[#94A3B8] tracking-widest uppercase block">
              Professional Edition
            </span>
          </div>
        </div>

        <button
          onClick={onShare}
          type="button"
          aria-label="Share card"
          className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-[#CBD5E1] hover:text-white border border-[#334155] transition-colors shrink-0 flex items-center gap-1 text-[11px] font-medium cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[#16A34A] pr-0.5">Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </header>

      {/* 2. Geometric Accent & Portrait */}
      <div className="relative pt-6 pb-2 px-6 flex flex-col items-center text-center">
        <div className="absolute top-0 inset-x-0 h-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#DC2626] -skew-y-3" />
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-28 h-12 bg-[#0F172A] skew-y-6 opacity-30" />
        </div>

        {/* Profile Photo */}
        <div className="relative z-10 mb-4 mt-2">
          <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-xs border-2 border-[#0F172A] relative">
            <div className="w-full h-full rounded-lg overflow-hidden bg-[#F1F5F9] flex items-center justify-center text-xl font-bold text-[#0F172A]">
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
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#DC2626] rounded-xs" />
          </div>
        </div>

        {/* Customer Name & Titles */}
        <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight uppercase leading-tight">
          {customer.name}
        </h1>

        <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
          {customer.jobTitle && (
            <span className="text-xs font-semibold text-[#DC2626] uppercase tracking-wider">
              {customer.jobTitle}
            </span>
          )}
          {customer.jobTitle && customer.company && (
            <span className="text-xs text-[#CBD5E1]">•</span>
          )}
          {customer.company && (
            <span className="text-xs font-medium text-[#475569] uppercase tracking-wider">
              {customer.company}
            </span>
          )}
        </div>

        {customer.bio && (
          <p className="text-xs text-[#475569] mt-3.5 leading-relaxed bg-[#F8FAFC] border-l-2 border-[#DC2626] py-2 px-3 text-left w-full rounded-r-lg">
            {customer.bio}
          </p>
        )}
      </div>

      {/* 3. 2-Column Information Grid */}
      <div className="px-6 py-4 border-t border-[#E2E8F0] mt-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-left">
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Phone
            </span>
            <a
              href={`tel:${customer.phone}`}
              className="block text-xs font-medium text-[#0F172A] hover:text-[#DC2626] truncate transition-colors"
            >
              {customer.phone}
            </a>
          </div>

          <div className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Email
            </span>
            {customer.email ? (
              <a
                href={`mailto:${customer.email}`}
                className="block text-xs font-medium text-[#0F172A] hover:text-[#DC2626] truncate transition-colors"
              >
                {customer.email}
              </a>
            ) : (
              <span className="block text-xs text-[#94A3B8]">—</span>
            )}
          </div>

          <div className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Company
            </span>
            <span className="block text-xs font-medium text-[#0F172A] truncate">
              {customer.company || "—"}
            </span>
          </div>

          <div className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Role
            </span>
            <span className="block text-xs font-medium text-[#0F172A] truncate">
              {customer.jobTitle || "—"}
            </span>
          </div>

          <div className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Website
            </span>
            {websiteHref ? (
              <a
                href={websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs font-medium text-[#0F172A] hover:text-[#DC2626] truncate transition-colors"
              >
                {customer.website?.replace(/^https?:\/\//, "")}
              </a>
            ) : (
              <span className="block text-xs text-[#94A3B8]">—</span>
            )}
          </div>

          <div className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Location
            </span>
            {locationHref ? (
              <a
                href={locationHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs font-medium text-[#0F172A] hover:text-[#DC2626] truncate transition-colors"
              >
                {customer.address || "View on Map"}
              </a>
            ) : (
              <span className="block text-xs text-[#94A3B8]">—</span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Contact Actions */}
      <div className="px-6 pb-4 pt-2 space-y-2.5">
        <a
          href={isPreview ? "#" : `/api/vcard/${qrCard.slug}`}
          download={!isPreview}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#DC2626]" />
          <span>Save Contact to Phone</span>
        </a>

        <div className="grid grid-cols-4 gap-1.5">
          <a
            href={`tel:${customer.phone}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-[11px] font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mb-0.5" />
            <span>Call</span>
          </a>

          {customer.email ? (
            <a
              href={`mailto:${customer.email}`}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-[11px] font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 mb-0.5" />
              <span>Email</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#94A3B8] text-[11px] font-medium opacity-50 cursor-not-allowed">
              <Mail className="w-3.5 h-3.5 mb-0.5" />
              <span>Email</span>
            </div>
          )}

          {websiteHref ? (
            <a
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-[11px] font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 mb-0.5" />
              <span>Web</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#94A3B8] text-[11px] font-medium opacity-50 cursor-not-allowed">
              <Globe className="w-3.5 h-3.5 mb-0.5" />
              <span>Web</span>
            </div>
          )}

          {locationHref ? (
            <a
              href={locationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-[11px] font-medium transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 mb-0.5 text-[#DC2626]" />
              <span>Map</span>
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#94A3B8] text-[11px] font-medium opacity-50 cursor-not-allowed">
              <MapPin className="w-3.5 h-3.5 mb-0.5" />
              <span>Map</span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Social Links */}
      {customer.socialLinks && customer.socialLinks.length > 0 && (
        <div className="px-6 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC]">
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
                  className="w-8 h-8 rounded-lg bg-white hover:bg-[#0F172A] text-[#475569] hover:text-white border border-[#E2E8F0] hover:border-[#0F172A] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Brand Footer */}
      <footer className="bg-[#0F172A] text-white px-5 py-3 text-center border-t border-[#1E293B]">
        {websiteHref ? (
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-[#CBD5E1] hover:text-white tracking-widest uppercase transition-colors"
          >
            {customer.website?.replace(/^https?:\/\//, "").toUpperCase()}
          </a>
        ) : (
          <span className="text-[11px] font-semibold text-[#CBD5E1] tracking-widest uppercase">
            {(customer.company || "Digital Business Card").toUpperCase()}
          </span>
        )}
      </footer>
    </div>
  );
}
