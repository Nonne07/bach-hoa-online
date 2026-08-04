"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/50 text-brand-600 font-bold text-sm mb-6 border border-brand-200/50 backdrop-blur-md">
          <span>👋</span> Hỗ trợ 24/7
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 mb-6 tracking-tight">Liên hệ với chúng tôi</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Hãy gửi tin nhắn hoặc liên hệ trực tiếp qua thông tin bên dưới.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        {/* Contact Form */}
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-white hover:shadow-2xl hover:shadow-brand-500/10 transition-shadow duration-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Mail className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Gửi tin nhắn</h2>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Họ và tên</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" placeholder="Nguyễn Văn A" />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Số điện thoại</label>
                <input type="tel" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" placeholder="0901234567" />
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email</label>
              <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" placeholder="email@example.com" />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Tiêu đề</label>
              <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm" placeholder="Vấn đề cần hỗ trợ" />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Nội dung</label>
              <textarea rows={5} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all group-hover:border-slate-300 shadow-sm resize-none" placeholder="Chi tiết nội dung..."></textarea>
            </div>
            <button type="button" className="w-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold text-lg py-5 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1">
              Gửi tin nhắn
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-10">
          <div className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[3rem] border border-white shadow-xl shadow-slate-200/20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Thông tin liên hệ</h2>
            <ul className="space-y-8">
              <li className="flex items-start gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Trụ sở chính</h3>
                  <p className="text-slate-600 mt-2 font-medium leading-relaxed">123 Đường ABC, Phường XYZ, Quận 1<br/>TP. Hồ Chí Minh</p>
                </div>
              </li>
              <li className="flex items-start gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Hotline</h3>
                  <p className="text-brand-600 mt-2 font-black text-xl">1900 1234</p>
                  <p className="text-slate-500 text-sm mt-1">(Miễn phí cuộc gọi)</p>
                </div>
              </li>
              <li className="flex items-start gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Email</h3>
                  <p className="text-slate-600 mt-2 font-medium">support@bachhoaonline.vn</p>
                </div>
              </li>
              <li className="flex items-start gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Thời gian làm việc</h3>
                  <p className="text-slate-600 mt-2 font-medium">Thứ 2 - Chủ Nhật<br/>7:00 - 22:00</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-200 h-[350px] rounded-[3rem] overflow-hidden relative shadow-2xl shadow-slate-200/50 border-[6px] border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.431234567!2d106.698123456!3d10.77123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4133456789%3A0x1234567890abcdef!2sBen%20Thanh%20Market!5e0!3m2!1sen!2svn!4v1620000000000!5m2!1sen!2svn" 
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-brand-500/10 pointer-events-none hover:opacity-0 transition-opacity duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
