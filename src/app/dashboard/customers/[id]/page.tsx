import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CustomerForm } from "@/components/customers/customer-form";
import { QrCode, ExternalLink, Eye, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id },
    select: { name: true },
  });
  return {
    title: customer ? `${customer.name} | Customer Profile` : "Customer Profile",
  };
}

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { id } = await params;

  const customer = await prisma.customer.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      socialLinks: true,
      qrCard: {
        include: {
          scans: {
            orderBy: { scannedAt: "desc" },
            take: 10,
          },
        },
      },
    },
  });

  if (!customer) {
    notFound();
  }

  const scanCount = customer.qrCard?.scans.length || 0;

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">{customer.name}</h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                customer.status === "ACTIVE"
                  ? "bg-[#F0FDF4] text-[#16A34A]"
                  : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {customer.status}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Created on {formatDate(customer.createdAt)} • {customer.company || "No Company Specified"}
          </p>
        </div>

        {customer.qrCard && (
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/cards/${customer.qrCard.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Code Studio</span>
            </Link>
            <a
              href={`/card/${customer.qrCard.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] font-medium text-xs border border-[#E2E8F0] shadow-2xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Card</span>
            </a>
          </div>
        )}
      </div>

      {/* Customer Quick Analytics */}
      {customer.qrCard && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
            <span className="text-xs text-[#64748B] font-medium">Customer Total Scans</span>
            <div className="flex items-center gap-2 mt-2">
              <Eye className="w-5 h-5 text-[#4F46E5]" />
              <p className="text-2xl font-bold text-[#0F172A]">{scanCount}</p>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
            <span className="text-xs text-[#64748B] font-medium">Public Slug / URL</span>
            <div className="mt-2 text-xs font-mono text-[#4F46E5] truncate">
              /card/{customer.qrCard.slug}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
            <span className="text-xs text-[#64748B] font-medium">Card Status</span>
            <p className="text-xs font-medium text-[#0F172A] mt-2">
              {customer.qrCard.status === "ACTIVE" ? "🟢 Live and Accessible" : "⚪ Temporarily Paused"}
            </p>
          </div>
        </div>
      )}

      {/* Edit Form */}
      <div>
        <h2 className="text-base font-semibold text-[#0F172A] mb-4">Edit Customer Details</h2>
        <CustomerForm initialData={customer} isEditing={true} />
      </div>
    </div>
  );
}
