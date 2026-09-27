"use client";

import React, { useState } from "react";
import { Check, Eye, X, Sparkles } from "lucide-react";
import { CardTemplate } from "./template-types";
import { TEMPLATE_LIST } from "./template-registry";
import { CardTemplatePreview } from "./card-template-preview";

interface TemplatePickerProps {
  selectedTemplate: CardTemplate;
  onSelectTemplate: (template: CardTemplate) => void;
  className?: string;
}

export function TemplatePicker({
  selectedTemplate,
  onSelectTemplate,
  className = "",
}: TemplatePickerProps) {
  const [previewTemplate, setPreviewTemplate] = useState<CardTemplate | null>(null);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#4F46E5]" />
              <span>Choose Card Visual Template</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-normal">
              Select an aesthetic template that matches this customer&apos;s corporate or personal identity.
            </p>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {TEMPLATE_LIST.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;

          return (
            <div
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              className={`relative rounded-xl p-5 sm:p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-sm"
                  : "bg-white hover:bg-[#F8FAFC] border-[#E2E8F0] shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: tpl.badgeBg, color: tpl.badgeText }}
                  >
                    {tpl.tagline}
                  </span>

                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#CBD5E1]" />
                  )}
                </div>

                <h4 className="text-base font-bold text-[#0F172A]">{tpl.name}</h4>
                <p className="text-xs sm:text-[13px] text-[#475569] mt-2 leading-relaxed">
                  {tpl.description}
                </p>

                <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] text-xs text-[#64748B] leading-relaxed">
                  <span className="font-semibold text-[#475569]">Best for: </span>
                  {tpl.bestFor}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate(tpl.id);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(tpl.id);
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#4F46E5] text-white"
                      : "bg-[#0F172A] hover:bg-[#1E293B] text-white"
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Preview Modal */}
      {previewTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {previewTemplate} Template Live Preview
                </h3>
                <p className="text-[11px] text-[#64748B]">
                  Simulated digital business card appearance on mobile
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Preview Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-[#F1F5F9]">
              <CardTemplatePreview template={previewTemplate} />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 border-t border-[#E2E8F0] bg-white flex items-center justify-between">
              <span className="text-xs text-[#64748B]">
                {selectedTemplate === previewTemplate
                  ? "✓ Currently selected template"
                  : "Click below to apply this template"}
              </span>
              <button
                type="button"
                onClick={() => {
                  onSelectTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Use This Template</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
