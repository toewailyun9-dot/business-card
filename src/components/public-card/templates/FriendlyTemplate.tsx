import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Share2,
  Check,
  Heart,
  MessageCircle,
} from "lucide-react";
import { TemplateProps } from "../template-types";
import { SocialIcon } from "../shared/social-icon";

export function FriendlyTemplate({
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
    <div className="w-full max-w-[400px] bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-lg flex flex-col text-[#1E293B]">
      {/* Friendly Warm Top Accent Bar */}
      <div className="bg-[#059669] text-white px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <Heart className="w-3.5 h-3.5 fill-current text-[#A7F3D0]" />
          <span>{customer.company || "Let's Connect"}</span>
        </div>

        <button
          onClick={onShare}
          type="button"
          aria-label="Share card"
          className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Warm Friendly Hero */}
      <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center">
        {/* Soft Rounded Portrait */}
        <div className="relative mb-3.5">
          <div className="w-24 h-24 rounded-full p-1 bg-white border-2 border-[#059669] shadow-sm">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#ECFDF5] flex items-center justify-center text-xl font-bold text-[#059669]">
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
          {/* Friendly Status Dot */}
          <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#10B981] border-2 border-white" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          {customer.name}
        </h1>

        {customer.jobTitle && (
          <p className="text-xs font-semibold text-[#059669] mt-0.5">
            {customer.jobTitle}
          </p>
        )}

        {customer.bio && (
          <div className="mt-3.5 p-3 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-xs text-[#166534] leading-relaxed max-w-xs">
            {customer.bio}
          </div>
        )}
      </div>

      {/* Friendly Touch Cards */}
      <div className="px-6 py-2 space-y-2">
        {/* Phone Card */}
        <a
          href={`tel:${customer.phone}`}
          className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Call Me</span>
            <span className="block text-xs font-medium text-[#0F172A] truncate">{customer.phone}</span>
          </div>
        </a>

        {/* Email Card */}
        {customer.email && (
          <a
            href={`mailto:${customer.email}`}
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Send Email</span>
              <span className="block text-xs font-medium text-[#0F172A] truncate">{customer.email}</span>
            </div>
          </a>
        )}

        {/* Website Card */}
        {websiteHref && (
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Visit Website</span>
              <span className="block text-xs font-medium text-[#0F172A] truncate">
                {customer.website?.replace(/^https?:\/\//, "")}
              </span>
            </div>
          </a>
        )}

        {/* Location Card */}
        {locationHref && (
          <a
            href={locationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Find Location</span>
              <span className="block text-xs font-medium text-[#0F172A] truncate">
                {customer.address || "Google Maps"}
              </span>
            </div>
          </a>
        )}
      </div>

      {/* Main Save Contact Action */}
      <div className="px-6 py-4">
        <a
          href={isPreview ? "#" : `/api/vcard/${qrCard.slug}`}
          download={!isPreview}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-md transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Save Contact to Phone</span>
        </a>
      </div>

      {/* Social Links */}
      {customer.socialLinks && customer.socialLinks.length > 0 && (
        <div className="px-6 pb-4 pt-1">
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
                  className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#059669] text-[#475569] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <SocialIcon platform={social.platform} className="w-4 h-4 fill-current" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Friendly Warm Footer */}
      <footer className="bg-[#F8FAFC] text-[#64748B] px-5 py-3 text-center border-t border-[#E2E8F0] text-xs">
        <span>Have a wonderful day!</span>
      </footer>
    </div>
  );
}
