"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  QrCode,
  Eye,
  Edit,
  Power,
  Trash2,
  ExternalLink,
  Users,
} from "lucide-react";
import { toggleCustomerStatus, deleteCustomer } from "@/actions/customer-actions";
import { formatDate } from "@/lib/utils";

interface CustomerWithRelations {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  jobTitle: string | null;
  status: string;
  createdAt: Date | string;
  qrCard: {
    id: string;
    slug: string;
    status: string;
    scans: { id: string }[];
  } | null;
}

interface CustomersClientViewProps {
  initialCustomers: CustomerWithRelations[];
}

export function CustomersClientView({ initialCustomers }: CustomersClientViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const filtered = customers.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      (c.company && c.company.toLowerCase().includes(term)) ||
      (c.phone && c.phone.toLowerCase().includes(term))
    );
  });

  const handleToggleStatus = async (customerId: string) => {
    setIsUpdating(customerId);
    const res = await toggleCustomerStatus(customerId);
    if (res.success && res.newStatus) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customerId
            ? {
                ...c,
                status: res.newStatus as string,
                qrCard: c.qrCard ? { ...c.qrCard, status: res.newStatus as string } : null,
              }
            : c
        )
      );
    }
    setIsUpdating(null);
  };

  const handleDelete = async (customerId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? All cards and scans will be removed.`)) {
      return;
    }
    setIsUpdating(customerId);
    const res = await deleteCustomer(customerId);
    if (res.success) {
      setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    }
    setIsUpdating(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Customers</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Centralized directory of customer profiles and dynamic business cards
          </p>
        </div>
        <Link
          href="/dashboard/customers/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </Link>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name, company, or phone number..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-xs"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs">
        {filtered.length === 0 ? (
          <div className="text-center py-12 px-4 bg-[#F8FAFC]">
            <Users className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
            <h3 className="text-sm font-medium text-[#0F172A]">No customers found</h3>
            <p className="text-xs text-[#64748B] mt-1">
              {searchTerm ? "Try searching with a different term." : "Get started by adding your first customer."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-[#64748B] bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr>
                  <th className="py-3 pl-6">Customer</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Scans</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-indigo-100 font-bold flex items-center justify-center text-xs shrink-0">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            className="font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors block text-sm"
                          >
                            {customer.name}
                          </Link>
                          {customer.jobTitle && (
                            <span className="text-[11px] text-[#64748B] block">
                              {customer.jobTitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#475569]">
                      {customer.company || <span className="text-[#94A3B8]">—</span>}
                    </td>

                    <td className="py-3.5 px-4 text-[#475569]">
                      <div className="font-medium text-[#0F172A]">{customer.phone}</div>
                      {customer.email && (
                        <div className="text-[11px] text-[#64748B] truncate max-w-[150px]">
                          {customer.email}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          customer.status === "ACTIVE"
                            ? "bg-[#F0FDF4] text-[#16A34A]"
                            : "bg-[#F1F5F9] text-[#64748B]"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#475569] font-medium">
                      {customer.qrCard?.scans.length || 0}
                    </td>

                    <td className="py-3.5 px-4 text-[#64748B]">
                      {formatDate(customer.createdAt)}
                    </td>

                    <td className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {customer.qrCard && (
                          <>
                            <Link
                              href={`/dashboard/cards/${customer.qrCard.id}`}
                              title="QR Code Management"
                              className="p-1.5 rounded-lg bg-white hover:bg-[#EEF2FF] text-[#4F46E5] border border-[#E2E8F0] shadow-2xs transition-colors"
                            >
                              <QrCode className="w-4 h-4" />
                            </Link>

                            <a
                              href={`/card/${customer.qrCard.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Public Card"
                              className="p-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#E2E8F0] shadow-2xs transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </>
                        )}

                        <Link
                          href={`/dashboard/customers/${customer.id}`}
                          title="Edit Customer"
                          className="p-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#E2E8F0] shadow-2xs transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleToggleStatus(customer.id)}
                          disabled={isUpdating === customer.id}
                          title={customer.status === "ACTIVE" ? "Deactivate" : "Activate"}
                          className={`p-1.5 rounded-lg border border-[#E2E8F0] shadow-2xs transition-colors ${
                            customer.status === "ACTIVE"
                              ? "bg-white hover:bg-[#FFFBEB] text-[#D97706] hover:border-[#FDE68A]"
                              : "bg-white hover:bg-[#F0FDF4] text-[#16A34A] hover:border-[#BBF7D0]"
                          }`}
                        >
                          <Power className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(customer.id, customer.name)}
                          disabled={isUpdating === customer.id}
                          title="Delete Customer"
                          className="p-1.5 rounded-lg bg-white hover:bg-[#FEF2F2] text-[#DC2626] hover:border-[#FCA5A5] border border-[#E2E8F0] shadow-2xs transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
