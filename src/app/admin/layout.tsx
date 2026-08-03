"use client";

import React from "react";
import Link from "next/link";
import { Home, Users, Package, ShoppingCart, Settings, LogOut, LayoutDashboard, Leaf } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row absolute inset-0 z-[100] top-0">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col h-full md:h-screen sticky top-0 shrink-0">
        <div className="p-6 flex items-center gap-2 border-b border-slate-800">
          <div className="bg-brand-500 p-2 rounded-xl">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-600 text-white font-medium">
            <LayoutDashboard className="w-5 h-5" /> Tổng quan
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Package className="w-5 h-5" /> Sản phẩm
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" /> Đơn hàng
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" /> Khách hàng
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Cài đặt
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Home className="w-5 h-5" /> Về trang chính
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-2">
            <LogOut className="w-5 h-5" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center px-8 justify-between">
          <h2 className="font-semibold text-slate-800 text-lg">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold">A</div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
