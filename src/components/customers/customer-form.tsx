"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Briefcase,
  Building,
  Mail,
  MapPin,
  Map,
  Globe,
  Save,
  ArrowLeft,
  Share2,
  Plus,
  Trash2,
  Upload,
  Camera,
  Loader2,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { createCustomer, updateCustomer, type CustomerFormData } from "@/actions/customer-actions";

export const SOCIAL_PLATFORMS = [
  { id: "facebook", name: "Facebook", placeholder: "https://facebook.com/username" },
  { id: "instagram", name: "Instagram", placeholder: "https://instagram.com/username" },
  { id: "linkedin", name: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { id: "telegram", name: "Telegram", placeholder: "https://t.me/username" },
  { id: "whatsapp", name: "WhatsApp", placeholder: "https://wa.me/959..." },
  { id: "twitter", name: "X (Twitter)", placeholder: "https://x.com/username" },
  { id: "tiktok", name: "TikTok", placeholder: "https://tiktok.com/@username" },
  { id: "youtube", name: "YouTube", placeholder: "https://youtube.com/@channel" },
  { id: "github", name: "GitHub", placeholder: "https://github.com/username" },
  { id: "viber", name: "Viber", placeholder: "https://viber.click/959..." },
] as const;

import { CardTemplate } from "@/components/public-card/template-types";
import { TemplatePicker } from "@/components/public-card/template-picker";

interface CustomerFormProps {
  initialData?: {
    id: string;
    name: string;
    phone: string;
    photo?: string | null;
    jobTitle?: string | null;
    company?: string | null;
    email?: string | null;
    address?: string | null;
    mapUrl?: string | null;
    website?: string | null;
    bio?: string | null;
    status: string;
    template?: CardTemplate | null;
    qrCard?: {
      template?: CardTemplate | null;
    } | null;
    socialLinks: { platform: string; url: string }[];
  };
  isEditing?: boolean;
}

export function CustomerForm({ initialData, isEditing = false }: CustomerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    photo: string;
    jobTitle: string;
    company: string;
    email: string;
    address: string;
    mapUrl: string;
    website: string;
    bio: string;
    status: "ACTIVE" | "INACTIVE";
    template: CardTemplate;
  }>({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    photo: initialData?.photo || "",
    jobTitle: initialData?.jobTitle || "",
    company: initialData?.company || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    mapUrl: initialData?.mapUrl || "",
    website: initialData?.website || "",
    bio: initialData?.bio || "",
    status: (initialData?.status as "ACTIVE" | "INACTIVE") || "ACTIVE",
    template: (initialData?.template || initialData?.qrCard?.template || "PROFESSIONAL") as CardTemplate,
  });

  // Dynamic social links state
  const [socialLinks, setSocialLinks] = useState<Array<{ platform: string; url: string }>>(() => {
    if (initialData?.socialLinks && initialData.socialLinks.length > 0) {
      return initialData.socialLinks.map((s) => ({
        platform: s.platform.toLowerCase(),
        url: s.url,
      }));
    }
    return [
      { platform: "facebook", url: "" },
      { platform: "viber", url: "" },
      { platform: "telegram", url: "" },
    ];
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Quick client validation
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose a valid image file (PNG, JPG, WebP, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be smaller than 5MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, photo: data.url }));
      } else {
        setUploadError(data.error || "Failed to upload image");
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: "" }));
    setUploadError(null);
  };

  const handleAddSocial = (preferredPlatform?: string) => {
    const used = new Set(socialLinks.map((s) => s.platform));
    const nextPlatform =
      preferredPlatform ||
      SOCIAL_PLATFORMS.find((p) => !used.has(p.id))?.id ||
      "facebook";
    setSocialLinks((prev) => [...prev, { platform: nextPlatform, url: "" }]);
  };

  const handleRemoveSocial = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSocialPlatformChange = (index: number, platform: string) => {
    setSocialLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, platform } : item))
    );
  };

  const handleSocialUrlChange = (index: number, url: string) => {
    setSocialLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, url } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validSocialLinks = socialLinks
      .filter((s) => s.url && s.url.trim().length > 0)
      .map((s) => ({ platform: s.platform.trim(), url: s.url.trim() }));

    const payload: CustomerFormData = {
      ...formData,
      socialLinks: validSocialLinks,
    };

    try {
      if (isEditing && initialData?.id) {
        const res = await updateCustomer(initialData.id, payload);
        if (res.success) {
          router.push(`/dashboard/customers/${initialData.id}`);
        } else {
          setError(res.error || "Failed to update customer");
        }
      } else {
        const res = await createCustomer(payload);
        if (res.success && res.customerId) {
          router.push(`/dashboard/customers/${res.customerId}`);
        } else {
          setError(res.error || "Failed to create customer");
        }
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customers</span>
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors active:scale-98 disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Saving..." : isEditing ? "Save Changes" : "Create Card & QR"}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-medium">
          {error}
        </div>
      )}

      {/* Main Profile Info */}
      <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
        <h2 className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
          <User className="w-4 h-4 text-[#4F46E5]" />
          <span>Primary Customer Information</span>
        </h2>

        {/* Profile Photo Upload */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Avatar Preview */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-[#E2E8F0] overflow-hidden bg-white shrink-0 shadow-xs flex items-center justify-center">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Customer avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#94A3B8]">
                  <Camera className="w-7 h-7 mb-1 text-[#64748B]" />
                  <span className="text-[10px] font-medium">No Photo</span>
                </div>
              )}

              {uploading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-2xs flex flex-col items-center justify-center text-white text-xs">
                  <Loader2 className="w-5 h-5 animate-spin mb-1 text-white" />
                  <span className="text-[10px] font-medium">Uploading</span>
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                  Customer Profile Photo
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Upload a high-quality portrait photo (PNG, JPG, WebP up to 5MB)
                </p>
              </div>

              {uploadError && (
                <p className="text-xs text-[#DC2626] font-medium bg-[#FEF2F2] border border-[#FCA5A5] py-1.5 px-2.5 rounded-lg">
                  {uploadError}
                </p>
              )}

              <div className="flex items-center gap-2.5 flex-wrap pt-1">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-medium text-xs shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>{uploading ? "Uploading..." : formData.photo ? "Change Photo" : "Upload Photo"}</span>
                </button>

                {formData.photo && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}

                <div className="text-[11px] text-[#64748B]">
                  {formData.photo ? "Photo uploaded" : "Supports camera & file upload"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Full Name <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Phone Number <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +959 123456789"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Job Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Briefcase className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="e.g. Managing Director"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Company / Organization
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Building className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. Apex Global Co."
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. john@apex.com"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Personal / Company Website
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Globe className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="e.g. apex.com or https://apex.com"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Card Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs cursor-pointer"
            >
              <option value="ACTIVE">ACTIVE (Public card visible)</option>
              <option value="INACTIVE">INACTIVE (Shows unavailable)</option>
            </select>
          </div>
        </div>

        {/* Address & Google Maps Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
              Office / Business Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <MapPin className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g. No. 123, Merchant Road, Yangon"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 flex items-center justify-between">
              <span>Google Maps Link</span>
              <span className="text-[10px] text-[#64748B] font-normal lowercase">maps.app.goo.gl</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Map className="h-4 w-4 text-[#16A34A]" />
              </div>
              <input
                type="text"
                name="mapUrl"
                value={formData.mapUrl}
                onChange={handleInputChange}
                placeholder="https://maps.app.goo.gl/... or Google Maps link"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
            Bio / Introduction
          </label>
          <div className="relative">
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Brief professional intro or services offered..."
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Social Links Dropdown Section */}
      <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#4F46E5]" />
              <span>Social Media Profiles</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Select any of the 10 social platforms from dropdown and enter the profile link
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleAddSocial()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] text-xs font-semibold transition-colors active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Social Link</span>
          </button>
        </div>

        {socialLinks.length === 0 ? (
          <div className="p-6 rounded-lg bg-[#F8FAFC] border border-dashed border-[#E2E8F0] text-center">
            <p className="text-xs text-[#64748B]">No social media links added yet.</p>
            <button
              type="button"
              onClick={() => handleAddSocial()}
              className="mt-2 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] cursor-pointer"
            >
              + Click to add your first social link
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {socialLinks.map((item, index) => {
              const currentPlatformInfo = SOCIAL_PLATFORMS.find(
                (p) => p.id === item.platform.toLowerCase()
              );
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                >
                  {/* Platform Dropdown */}
                  <div className="w-full sm:w-52 shrink-0">
                    <select
                      value={item.platform.toLowerCase()}
                      onChange={(e) => handleSocialPlatformChange(index, e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all cursor-pointer shadow-xs"
                    >
                      {SOCIAL_PLATFORMS.map((plat) => (
                        <option key={plat.id} value={plat.id}>
                          {plat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* URL Input */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => handleSocialUrlChange(index, e.target.value)}
                      placeholder={currentPlatformInfo?.placeholder || "https://..."}
                      className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-xs focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveSocial(index)}
                    aria-label="Remove social link"
                    className="p-2 rounded-lg text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors self-end sm:self-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Add Platform Chips */}
        <div className="pt-2 border-t border-[#E2E8F0]">
          <span className="text-[11px] font-medium text-[#64748B] block mb-2">
            Quick Add Platforms:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SOCIAL_PLATFORMS.map((plat) => {
              const isAdded = socialLinks.some((s) => s.platform.toLowerCase() === plat.id);
              return (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() => handleAddSocial(plat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    isAdded
                      ? "bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]"
                      : "bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#E2E8F0] shadow-2xs"
                  }`}
                >
                  +{plat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visual Template Selector */}
      <div className="p-6 sm:p-8 lg:p-9 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs mt-8">
        <TemplatePicker
          selectedTemplate={formData.template}
          onSelectTemplate={(t) => setFormData((prev) => ({ ...prev, template: t }))}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors active:scale-98 disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Processing..." : isEditing ? "Save Changes" : "Create Card & Dynamic QR"}</span>
        </button>
      </div>
    </form>
  );
}
