"use client";

import React, { useState } from "react";
import { Settings, Bell, Mail, Smartphone, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";

export default function SettingsPage() {
  const { data: session } = useSession();
  
  const [settings, setSettings] = useState({
    emailPromos: true,
    emailOrders: true,
    smsOrders: false,
    pushNotifs: true,
    twoFactor: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
              Cài đặt thông báo
            </h1>
            
            <div className="space-y-8 max-w-2xl">
              {/* Notification Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Bell className="w-5 h-5 text-brand-500" /> Kênh thông báo
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Mail className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold text-slate-900">Email Khuyến mãi</div>
                        <div className="text-sm text-slate-500">Nhận thông tin về các chương trình giảm giá mới nhất</div>
                      </div>
                    </div>
                    <button onClick={() => toggle("emailPromos")} className={`relative w-12 h-6 rounded-full transition-colors ${settings.emailPromos ? "bg-brand-500" : "bg-slate-300"}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.emailPromos ? "translate-x-6" : "translate-x-0"}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Smartphone className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold text-slate-900">SMS Đơn hàng</div>
                        <div className="text-sm text-slate-500">Nhận tin nhắn SMS cập nhật trạng thái đơn hàng</div>
                      </div>
                    </div>
                    <button onClick={() => toggle("smsOrders")} className={`relative w-12 h-6 rounded-full transition-colors ${settings.smsOrders ? "bg-brand-500" : "bg-slate-300"}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.smsOrders ? "translate-x-6" : "translate-x-0"}`}></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="space-y-6 pt-4">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Shield className="w-5 h-5 text-brand-500" /> Bảo mật
                </h3>
                
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Shield className="w-5 h-5" /></div>
                    <div>
                      <div className="font-bold text-slate-900">Xác thực 2 lớp (2FA)</div>
                      <div className="text-sm text-slate-500">Tăng cường bảo mật cho tài khoản của bạn</div>
                    </div>
                  </div>
                  <button onClick={() => toggle("twoFactor")} className={`relative w-12 h-6 rounded-full transition-colors ${settings.twoFactor ? "bg-brand-500" : "bg-slate-300"}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.twoFactor ? "translate-x-6" : "translate-x-0"}`}></div>
                  </button>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-100/50 flex justify-end">
                <button type="button" onClick={() => alert("Đã lưu cài đặt thành công!")} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  Lưu cài đặt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
