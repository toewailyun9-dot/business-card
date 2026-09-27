"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { PublicCustomerData, PublicQrCardData } from "./template-types";
import { getTemplateComponent } from "./template-registry";

interface PublicCardViewProps {
  qrCard: PublicQrCardData;
  customer: PublicCustomerData;
}

export function PublicCardView({ qrCard, customer }: PublicCardViewProps) {
  const [copied, setCopied] = useState(false);

  // Inactive card state
  if (qrCard.status !== "ACTIVE") {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white border border-[#E2E8F0] rounded-2xl p-6 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-[#0F172A]">Card Deactivated</h2>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            This digital business card is temporarily unavailable or has been paused by the owner.
          </p>
          <div className="mt-5 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#94A3B8]">
            QR Business Card Platform
          </div>
        </div>
      </main>
    );
  }

  // Handle Share functionality
  const handleShare = async () => {
    const shareData = {
      title: `${customer.name} - Digital Business Card`,
      text: `${customer.name}${customer.jobTitle ? ` (${customer.jobTitle})` : ""}${customer.company ? ` at ${customer.company}` : ""}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback prompt
      window.prompt("Copy card link:", window.location.href);
    }
  };

  // Dynamically select and render template
  const TemplateComponent = getTemplateComponent(qrCard.template);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8">
      <TemplateComponent
        customer={customer}
        qrCard={qrCard}
        onShare={handleShare}
        copied={copied}
        isPreview={false}
      />
    </main>
  );
}
