"use client";

import React from "react";
import { User, MapPin, Settings, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 p-4 border-b border-slate-100 mb-2">
            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-800">Nguyễn Văn A</div>
              <div className="text-xs text-slate-500">Thành viên Bạc</div>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 text-brand-600 font-medium">
              <User className="w-5 h-5" /> Thông tin tài khoản
            </Link>
            <Link href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <Package className="w-5 h-5" /> Quản lý đơn hàng
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <MapPin className="w-5 h-5" /> Sổ địa chỉ
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <Settings className="w-5 h-5" /> Cài đặt thông báo
            </Link>
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-4">
              <LogOut className="w-5 h-5" /> Đăng xuất
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Thông tin tài khoản</h1>
          
          <form className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                <input type="text" defaultValue="Nguyễn Văn A" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
                <input type="tel" defaultValue="0901234567" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" defaultValue="nguyenvana@example.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ngày sinh</label>
                <input type="date" defaultValue="1990-01-01" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Giới tính</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex gap-4">
              <Button type="button" variant="primary">Lưu thay đổi</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
