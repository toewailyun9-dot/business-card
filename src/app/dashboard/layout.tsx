import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logoutUser } from "@/actions/auth-actions";
import {
  LogOut,
  QrCode,
  PlusCircle,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#E2E8F0] p-4 md:p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <Link href="/dashboard" className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-sm tracking-tight text-[#0F172A] block">
                QR Business Card
              </span>
              <span className="text-xs text-[#64748B] block truncate max-w-[140px]">
                {user.name}
              </span>
            </div>
          </Link>

          {/* Quick Action Primary CTA */}
          <div className="mb-6">
            <Link
              href="/dashboard/customers/new"
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Customer</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <DashboardNav />
        </div>

        {/* User Card & Logout */}
        <div className="pt-5 border-t border-[#E2E8F0] mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="truncate pr-2">
              <p className="text-xs font-semibold text-[#0F172A] truncate">{user.name}</p>
              <p className="text-[11px] text-[#64748B] truncate">{user.email}</p>
            </div>
          </div>
          <form action={logoutUser}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-[#F8FAFC] hover:bg-[#FEF2F2] hover:text-[#DC2626] hover:border-[#FCA5A5] border border-[#E2E8F0] text-xs text-[#64748B] font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
