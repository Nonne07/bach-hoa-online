"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, Settings, Package } from "lucide-react";
import { SignOutButton } from "@/components/ui/SignOutButton";

export function ProfileSidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  const links = [
    { href: "/profile", icon: User, label: "Thông tin tài khoản" },
    { href: "/orders", icon: Package, label: "Quản lý đơn hàng" },
    { href: "/profile/address", icon: MapPin, label: "Sổ địa chỉ" },
    { href: "/profile/settings", icon: Settings, label: "Cài đặt thông báo" },
  ];

  return (
    <div className="w-full md:w-72 shrink-0">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/40 border border-white sticky top-28">
        <div className="flex items-center gap-5 p-4 border-b border-slate-100 mb-4 pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <span className="font-bold text-2xl">
              {userName ? userName.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
            </span>
          </div>
          <div>
            <div className="font-extrabold text-xl text-slate-800">{userName || "Khách"}</div>
            <div className="text-sm font-bold text-brand-500 mt-1">Thành viên</div>
          </div>
        </div>
        
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-medium ${
                  isActive 
                    ? "bg-brand-50 text-brand-600 font-bold shadow-inner" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5" /> {link.label}
              </Link>
            );
          })}
          
          <div className="mt-6 px-2">
            <SignOutButton />
          </div>
        </nav>
      </div>
    </div>
  );
}
