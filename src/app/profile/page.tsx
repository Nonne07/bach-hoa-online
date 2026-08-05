"use client";

import React from "react";
import { User, MapPin, Settings, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { SignOutButton } from "@/components/ui/SignOutButton";

export default function ProfilePage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse"></div>
      
      <div className="flex flex-col md:flex-row gap-10 relative z-10">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-72 shrink-0">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/40 border border-white sticky top-28">
            <div className="flex items-center gap-5 p-4 border-b border-slate-100 mb-4 pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="font-extrabold text-xl text-slate-800">Nguyễn Văn A</div>
                <div className="text-sm font-bold text-brand-500 mt-1">Thành viên Bạc</div>
              </div>
            </div>
            
            <nav className="space-y-2">
              <Link href="/profile" className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-brand-50 text-brand-600 font-bold shadow-inner">
                <User className="w-5 h-5" /> Thông tin tài khoản
              </Link>
              <Link href="/orders" className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all font-medium">
                <Package className="w-5 h-5" /> Quản lý đơn hàng
              </Link>
              <Link href="#" onClick={(e) => { e.preventDefault(); alert("Chức năng đang được cập nhật!"); }} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all font-medium">
                <MapPin className="w-5 h-5" /> Sổ địa chỉ
              </Link>
              <Link href="#" onClick={(e) => { e.preventDefault(); alert("Chức năng đang được cập nhật!"); }} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all font-medium">
                <Settings className="w-5 h-5" /> Cài đặt thông báo
              </Link>
              <div className="mt-6 px-2">
                <SignOutButton />
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-white">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight flex items-center gap-3">
              <div className="bg-brand-100 p-2 rounded-xl text-brand-600">
                <Settings className="w-6 h-6" />
              </div>
              Thông tin tài khoản
            </h1>
            
            <form className="space-y-8 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Họ và tên</label>
                  <input type="text" defaultValue="Nguyễn Văn A" className="w-full px-5 py-4 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Số điện thoại</label>
                  <input type="tel" defaultValue="0901234567" className="w-full px-5 py-4 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" />
                </div>
                <div className="col-span-full group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" defaultValue="nguyenvana@example.com" className="w-full px-5 py-4 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Ngày sinh</label>
                  <input type="date" defaultValue="1990-01-01" className="w-full px-5 py-4 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Giới tính</label>
                  <select className="w-full px-5 py-4 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm cursor-pointer">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-100/50">
                <button type="button" className="px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
