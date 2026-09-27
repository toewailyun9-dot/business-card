"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";

export function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      icon: Users,
      isActive: pathname.startsWith("/dashboard/customers"),
    },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              item.isActive
                ? "bg-[#EEF2FF] text-[#4F46E5] font-semibold"
                : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
            }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${
                item.isActive ? "text-[#4F46E5]" : "text-[#64748B]"
              }`}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
