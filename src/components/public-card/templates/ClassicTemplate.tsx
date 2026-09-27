import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Share2,
  Check,
  Award,
} from "lucide-react";
import { TemplateProps } from "../template-types";
import { SocialIcon } from "../shared/social-icon";

export function ClassicTemplate({
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
    <div className="w-full max-w-[400px] bg-[#FAF8F5] border-2 border-[#D6CEBF] rounded-xl overflow-hidden shadow-md flex flex-col text-[#292524] relative">
      {/* Subtle Printed Border Accent Frame */}
      <div className="m-2.5 border border-[#E7E0D3] rounded-lg bg-white overflow-hidden flex flex-col">
        {/* Classic Header Ribbon */}
        <div className="bg-[#1C2D42] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#0F1E2E]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E2E8F0]">
              {customer.company || "Official Business Card"}
            </span>
          </div>

          <button
            onClick={onShare}
            type="button"
            aria-label="Share card"
            className="px-2 py-1 rounded bg-[#2A3F58] hover:bg-[#395373] text-white text-[10px] font-medium tracking-wider uppercase transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#4ADE80]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Main Card Face */}
        <div className="p-6 text-center">
          {/* Classic Portrait with double line border */}
          <div className="inline-block p-1 border border-[#A8A29E] rounded-md bg-[#FAF8F5] mb-4 shadow-2xs">
            <div className="w-20 h-20 rounded bg-[#E7E5E4] overflow-hidden flex items-center justify-center text-lg font-bold text-[#44403C]">
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

          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif uppercase">
            {customer.name}
          </h1>

          {customer.jobTitle && (
            <p className="text-xs font-semibold text-[#854D0E] tracking-wider uppercase mt-1">
              {customer.jobTitle}
            </p>
          )}

          {customer.company && (
            <p className="text-xs font-medium text-[#78716C] mt-0.5">
              {customer.company}
            </p>
          )}

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-10 h-px bg-[#D6D3D1]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#854D0E]" />
            <div className="w-10 h-px bg-[#D6D3D1]" />
          </div>

          {customer.bio && (
            <p className="text-xs text-[#57534E] leading-relaxed mb-4 px-2">
              {customer.bio}
            </p>
          )}

          {/* Traditional 2-Column Info Table */}
          <div className="border-t border-b border-[#E7E5E4] py-3 my-2 text-left">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="border-r border-[#E7E5E4] pr-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">
                  Telephone
                </span>
                <a
                  href={`tel:${customer.phone}`}
                  className="block text-xs font-medium text-[#1C1917] hover:text-[#854D0E] truncate"
                >
                  {customer.phone}
                </a>
              </div>

              <div className="pl-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">
                  Electronic Mail
                </span>
                {customer.email ? (
                  <a
                    href={`mailto:${customer.email}`}
                    className="block text-xs font-medium text-[#1C1917] hover:text-[#854D0E] truncate"
                  >
                    {customer.email}
                  </a>
                ) : (
                  <span className="text-[#A8A29E]">—</span>
                )}
              </div>

              <div className="border-r border-[#E7E5E4] pr-2 pt-1.5 border-t">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">
                  Web Address
                </span>
                {websiteHref ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-medium text-[#854D0E] truncate"
                  >
                    {customer.website?.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  <span className="text-[#A8A29E]">—</span>
                )}
              </div>

              <div className="pl-1 pt-1.5 border-t">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">
                  Office Location
                </span>
                {locationHref ? (
                  <a
                    href={locationHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-medium text-[#1C1917] hover:text-[#854D0E] truncate"
                  >
                    {customer.address || "Map Location"}
                  </a>
                ) : (
                  <span className="text-[#A8A29E]">—</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 space-y-2">
            <a
              href={isPreview ? "#" : `/api/vcard/${qrCard.slug}`}
              download={!isPreview}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#1C2D42] hover:bg-[#2A3F58] text-white font-medium text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>Save Contact Card</span>
            </a>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <a
                href={`tel:${customer.phone}`}
                className="py-1.5 px-1 rounded border border-[#D6D3D1] bg-white hover:bg-[#FAF8F5] text-[#292524] text-[11px] font-medium flex flex-col items-center"
              >
                <Phone className="w-3.5 h-3.5 mb-0.5 text-[#1C2D42]" />
                <span>Call</span>
              </a>

              {customer.email ? (
                <a
                  href={`mailto:${customer.email}`}
                  className="py-1.5 px-1 rounded border border-[#D6D3D1] bg-white hover:bg-[#FAF8F5] text-[#292524] text-[11px] font-medium flex flex-col items-center"
                >
                  <Mail className="w-3.5 h-3.5 mb-0.5 text-[#1C2D42]" />
                  <span>Email</span>
                </a>
              ) : (
                <div className="py-1.5 px-1 rounded border border-[#E7E5E4] text-[#A8A29E] text-[11px] font-medium flex flex-col items-center opacity-40">
                  <Mail className="w-3.5 h-3.5 mb-0.5" />
                  <span>Email</span>
                </div>
              )}

              {websiteHref ? (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-1 rounded border border-[#D6D3D1] bg-white hover:bg-[#FAF8F5] text-[#292524] text-[11px] font-medium flex flex-col items-center"
                >
                  <Globe className="w-3.5 h-3.5 mb-0.5 text-[#1C2D42]" />
                  <span>Web</span>
                </a>
              ) : (
                <div className="py-1.5 px-1 rounded border border-[#E7E5E4] text-[#A8A29E] text-[11px] font-medium flex flex-col items-center opacity-40">
                  <Globe className="w-3.5 h-3.5 mb-0.5" />
                  <span>Web</span>
                </div>
              )}

              {locationHref ? (
                <a
                  href={locationHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-1 rounded border border-[#D6D3D1] bg-white hover:bg-[#FAF8F5] text-[#292524] text-[11px] font-medium flex flex-col items-center"
                >
                  <MapPin className="w-3.5 h-3.5 mb-0.5 text-[#854D0E]" />
                  <span>Map</span>
                </a>
              ) : (
                <div className="py-1.5 px-1 rounded border border-[#E7E5E4] text-[#A8A29E] text-[11px] font-medium flex flex-col items-center opacity-40">
                  <MapPin className="w-3.5 h-3.5 mb-0.5" />
                  <span>Map</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Row */}
          {customer.socialLinks && customer.socialLinks.length > 0 && (
            <div className="pt-4 border-t border-[#E7E5E4] mt-4 flex items-center justify-center gap-2 flex-wrap">
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
                    className="w-7 h-7 rounded border border-[#D6D3D1] bg-[#FAF8F5] hover:bg-[#1C2D42] text-[#57534E] hover:text-white flex items-center justify-center transition-colors"
                  >
                    <SocialIcon platform={social.platform} className="w-3.5 h-3.5 fill-current" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Traditional Footer */}
        <div className="bg-[#FAF8F5] py-2.5 px-4 text-center border-t border-[#E7E0D3]">
          <span className="text-[10px] uppercase tracking-widest text-[#78716C] font-semibold">
            {customer.website?.replace(/^https?:\/\//, "") || customer.company || "Traditional Printed Series"}
          </span>
        </div>
      </div>
    </div>
  );
}
