"use client";

import React from "react";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse"></div>
      
      <div className="flex flex-col md:flex-row gap-10 relative z-10">
        {/* Sidebar Navigation */}
        <ProfileSidebar userName={session?.user?.name} />

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
