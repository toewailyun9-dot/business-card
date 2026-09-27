import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Users,
  CreditCard,
  QrCode,
  Eye,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Dashboard Overview | QR Business Card Platform",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const userId = user.id;

  // Aggregate metrics
  const [
    totalCustomers,
    activeCardsCount,
    inactiveCardsCount,
    allCardsWithScans,
    recentCustomers,
  ] = await Promise.all([
    prisma.customer.count({ where: { userId } }),
    prisma.qrCard.count({
      where: {
        customer: { userId },
        status: "ACTIVE",
      },
    }),
    prisma.qrCard.count({
      where: {
        customer: { userId },
        status: "INACTIVE",
      },
    }),
    prisma.qrCard.findMany({
      where: { customer: { userId } },
      select: {
        id: true,
        scans: {
          select: {
            scannedAt: true,
          },
        },
      },
    }),
    prisma.customer.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        qrCard: true,
      },
    }),
  ]);

  // Calculate scans
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let totalScans = 0;
  let todayScans = 0;
  let weekScans = 0;
  let monthScans = 0;

  for (const card of allCardsWithScans) {
    for (const scan of card.scans) {
      totalScans++;
      const scanDate = new Date(scan.scannedAt);
      if (scanDate >= startOfToday) todayScans++;
      if (scanDate >= startOfWeek) weekScans++;
      if (scanDate >= startOfMonth) monthScans++;
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="rounded-xl bg-white p-6 border border-[#E2E8F0] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Card Platform</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#475569] max-w-xl">
              Manage your client digital business cards, customize dynamic profiles, and monitor real-time scan analytics from one unified console.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/customers/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Customer</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Customers */}
        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Total Customers</span>
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#475569] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0F172A] mt-2">{totalCustomers}</p>
          <div className="mt-1 text-[11px] text-[#64748B]">
            Registered customer profiles
          </div>
        </div>

        {/* Active Cards */}
        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Active Cards</span>
            <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0F172A] mt-2">{activeCardsCount}</p>
          <div className="mt-1 text-[11px] text-[#64748B]">
            Live public QR cards
          </div>
        </div>

        {/* Inactive Cards */}
        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Inactive Cards</span>
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#64748B] flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0F172A] mt-2">{inactiveCardsCount}</p>
          <div className="mt-1 text-[11px] text-[#64748B]">
            Paused or disabled cards
          </div>
        </div>

        {/* Total Scans */}
        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Total Scans</span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0F172A] mt-2">{totalScans}</p>
          <div className="mt-1 text-[11px] text-[#64748B]">
            Total QR scans logged
          </div>
        </div>
      </div>

      {/* Analytics Breakdown Card */}
      <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
        <h2 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#4F46E5]" />
          <span>Scan Analytics Timeline</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs text-[#64748B] font-medium">Today</span>
            <p className="text-2xl font-bold text-[#0F172A] mt-1">{todayScans}</p>
            <span className="text-[11px] text-[#94A3B8]">Scans recorded today</span>
          </div>
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs text-[#64748B] font-medium">This Week</span>
            <p className="text-2xl font-bold text-[#0F172A] mt-1">{weekScans}</p>
            <span className="text-[11px] text-[#94A3B8]">Last 7 days scans</span>
          </div>
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs text-[#64748B] font-medium">This Month</span>
            <p className="text-2xl font-bold text-[#0F172A] mt-1">{monthScans}</p>
            <span className="text-[11px] text-[#94A3B8]">Current month engagement</span>
          </div>
        </div>
      </div>

      {/* Recent Customers Section */}
      <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-[#0F172A]">Recent Customer Cards</h2>
            <p className="text-xs text-[#64748B] mt-0.5">Recently added digital business cards</p>
          </div>
          <Link
            href="/dashboard/customers"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentCustomers.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-[#E2E8F0] rounded-xl bg-[#F8FAFC]">
            <Users className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#0F172A]">No customers yet</p>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
              Create your first customer to generate a dynamic digital business card and QR code.
            </p>
            <div className="mt-4">
              <Link
                href="/dashboard/customers/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-xs shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Customer</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-[#64748B] bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr>
                  <th className="py-2.5 pl-3">Customer</th>
                  <th className="py-2.5 px-3">Company / Role</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Created</th>
                  <th className="py-2.5 pr-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {recentCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 pl-3 font-medium text-[#0F172A]">
                      <Link
                        href={`/dashboard/customers/${cust.id}`}
                        className="hover:text-[#4F46E5] transition-colors"
                      >
                        {cust.name}
                      </Link>
                    </td>
                    <td className="py-3 px-3 text-[#475569]">
                      {cust.jobTitle || cust.company ? (
                        <span>
                          {cust.jobTitle}
                          {cust.jobTitle && cust.company && " • "}
                          {cust.company}
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-[#475569]">{cust.phone}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          cust.status === "ACTIVE"
                            ? "bg-[#F0FDF4] text-[#16A34A]"
                            : "bg-[#F1F5F9] text-[#64748B]"
                        }`}
                      >
                        {cust.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#64748B]">{formatDate(cust.createdAt)}</td>
                    <td className="py-3 pr-3 text-right">
                      {cust.qrCard && (
                        <Link
                          href={`/dashboard/cards/${cust.qrCard.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-medium border border-[#E2E8F0] shadow-2xs transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#4F46E5]" />
                          <span>QR Card</span>
                        </Link>
                      )}
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
