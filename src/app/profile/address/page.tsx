"use client";

import React from "react";
import { MapPin, Plus, Trash2, Edit2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";

export default function AddressPage() {
  const { data: session } = useSession();

  const addresses = [
    {
      id: 1,
      name: "Nhà riêng",
      address: "123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
      phone: "0901234567",
      isDefault: true,
    },
    {
      id: 2,
      name: "Cơ quan",
      address: "Tòa nhà Bitexco, Số 2 Hải Triều, Quận 1, TP. Hồ Chí Minh",
      phone: "0901234567",
      isDefault: false,
    }
  ];

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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                <div className="bg-brand-100 p-2 rounded-xl text-brand-600">
                  <MapPin className="w-6 h-6" />
                </div>
                Sổ địa chỉ
              </h1>
              <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30">
                <Plus className="w-5 h-5" /> Thêm địa chỉ mới
              </button>
            </div>
            
            <div className="space-y-6">
              {addresses.map((addr) => (
                <div key={addr.id} className={`p-6 rounded-2xl border-2 transition-all ${addr.isDefault ? "border-brand-500 bg-brand-50/50" : "border-slate-200 bg-white hover:border-brand-300"}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-slate-900">{addr.name}</h3>
                      {addr.isDefault && (
                        <span className="bg-brand-100 text-brand-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                          Mặc định
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 min-w-[100px]">Người nhận:</span>
                      <span>{session?.user?.name || "Nguyễn Văn A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 min-w-[100px]">Điện thoại:</span>
                      <span>{addr.phone}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold text-slate-700 min-w-[100px]">Địa chỉ:</span>
                      <span className="flex-1">{addr.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
