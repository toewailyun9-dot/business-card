"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  Download,
  Copy,
  Printer,
  Check,
  Power,
  ExternalLink,
  Sparkles,
  Share2,
  ArrowLeft,
  Info,
} from "lucide-react";
import Link from "next/link";
import { toggleCardStatus, updateCardTemplate } from "@/actions/card-actions";
import { CardTemplate } from "@/components/public-card/template-types";
import { TemplatePicker } from "@/components/public-card/template-picker";

interface QrCardStudioProps {
  card: {
    id: string;
    slug: string;
    status: string;
    template?: CardTemplate;
    customer: {
      id: string;
      name: string;
      jobTitle: string | null;
      company: string | null;
      phone: string;
      email: string | null;
    };
  };
  baseUrl: string;
}

export function QrCardStudio({ card, baseUrl }: QrCardStudioProps) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(card.status);
  const [template, setTemplate] = useState<CardTemplate>(card.template || "PROFESSIONAL");
  const [loading, setLoading] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(false);
  const [templateSuccess, setTemplateSuccess] = useState<string | null>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const cardUrl = `${baseUrl}/card/${card.slug}`;

  useEffect(() => {
    QRCode.toDataURL(cardUrl, {
      width: 450,
      margin: 2,
      color: {
        dark: "#0f172a", // deep slate / indigo
        light: "#ffffff",
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error(err));
  }, [cardUrl]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPng = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `QR-${card.customer.name.replace(/\s+/g, "_")}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleStatus = async () => {
    setLoading(true);
    const res = await toggleCardStatus(card.id);
    if (res.success && res.status) {
      setStatus(res.status);
    }
    setLoading(false);
  };

  const handleTemplateChange = async (newTemplate: CardTemplate) => {
    setTemplate(newTemplate);
    setTemplateLoading(true);
    setTemplateSuccess(null);
    const res = await updateCardTemplate(card.id, newTemplate);
    if (res.success) {
      setTemplateSuccess(`Design template updated to ${newTemplate}!`);
      setTimeout(() => setTemplateSuccess(null), 3000);
    }
    setTemplateLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/customers/${card.customer.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {card.customer.name}&apos;s Profile</span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={cardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] font-medium text-xs border border-[#E2E8F0] shadow-2xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Card</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Printable QR Card Frame */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            ref={printAreaRef}
            id="printable-qr-card"
            className="w-full max-w-sm bg-white text-[#0F172A] rounded-xl p-8 shadow-xs border border-[#E2E8F0] flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Top accent badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-medium">
              <Sparkles className="w-3 h-3 text-[#4F46E5]" />
              <span>Digital Business Card</span>
            </div>

            {/* Customer Details */}
            <h2 className="text-xl font-bold text-[#0F172A]">{card.customer.name}</h2>
            {(card.customer.jobTitle || card.customer.company) && (
              <p className="text-xs text-[#4F46E5] font-medium mt-0.5">
                {card.customer.jobTitle}
                {card.customer.jobTitle && card.customer.company && " • "}
                {card.customer.company}
              </p>
            )}

            {/* QR Code Canvas */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              {dataUrl ? (
                <img
                  src={dataUrl}
                  alt={`QR code for ${card.customer.name}`}
                  className="w-56 h-56 object-contain"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-xs text-[#94A3B8]">
                  Generating QR...
                </div>
              )}
            </div>

            <p className="text-xs font-medium text-[#475569] mt-4">
              Scan with phone camera to connect
            </p>
            <p className="text-[11px] text-[#64748B] font-mono mt-1 break-all px-4">
              {cardUrl}
            </p>
          </div>
        </div>

        {/* Actions & Information Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card Management Controls */}
          <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#0F172A]">QR Card Controls</h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Share, download, or toggle access
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  status === "ACTIVE"
                    ? "bg-[#F0FDF4] text-[#16A34A]"
                    : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleDownloadPng}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] font-medium text-xs border border-[#E2E8F0] shadow-2xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#16A34A]" />
                    <span className="text-[#16A34A]">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Card URL</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] font-medium text-xs border border-[#E2E8F0] shadow-2xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print QR Card</span>
              </button>

              <button
                onClick={handleToggleStatus}
                disabled={loading}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-xs border border-[#E2E8F0] shadow-2xs transition-colors cursor-pointer ${
                  status === "ACTIVE"
                    ? "bg-white hover:bg-[#FFFBEB] text-[#D97706] hover:border-[#FDE68A]"
                    : "bg-white hover:bg-[#F0FDF4] text-[#16A34A] hover:border-[#BBF7D0]"
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{status === "ACTIVE" ? "Deactivate Card" : "Activate Card"}</span>
              </button>
            </div>
          </div>

          {/* Dynamic QR Architecture Explainer */}
          <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EEF2FF] text-[#4F46E5] shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#0F172A]">
                  Dynamic QR Guarantee
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  This QR Code points to the permanent dynamic link{" "}
                  <code className="bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0] text-[#0F172A] font-mono text-[11px]">
                    /card/{card.slug}
                  </code>
                  . Even if you update the customer&apos;s phone, email, company, address, or social links later,{" "}
                  <strong className="text-[#0F172A]">this printed QR Code will never change or expire</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Visual Template Picker */}
      <div className="w-full p-6 sm:p-8 lg:p-9 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
        {templateSuccess && (
          <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <Check className="w-4 h-4 shrink-0" />
            <span>{templateSuccess}</span>
          </div>
        )}

        <TemplatePicker
          selectedTemplate={template}
          onSelectTemplate={handleTemplateChange}
        />
      </div>
    </div>
  );
}
