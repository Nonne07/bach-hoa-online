"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Liên hệ với chúng tôi</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Hãy gửi tin nhắn hoặc liên hệ trực tiếp qua thông tin bên dưới.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Gửi tin nhắn</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
                <input type="tel" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="0901234567" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tiêu đề</label>
              <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Vấn đề cần hỗ trợ" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nội dung</label>
              <textarea rows={5} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Chi tiết nội dung..."></textarea>
            </div>
            <Button size="lg" className="w-full rounded-xl shadow-lg shadow-brand-500/30">
              Gửi tin nhắn
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Thông tin liên hệ</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Trụ sở chính</h3>
                  <p className="text-slate-600 mt-1">123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Hotline</h3>
                  <p className="text-slate-600 mt-1">1900 1234 (Miễn phí cuộc gọi)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email</h3>
                  <p className="text-slate-600 mt-1">support@bachhoaonline.vn</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-600 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Thời gian làm việc</h3>
                  <p className="text-slate-600 mt-1">Thứ 2 - Chủ Nhật: 7:00 - 22:00</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-100 h-64 rounded-3xl overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.431234567!2d106.698123456!3d10.77123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4133456789%3A0x1234567890abcdef!2sBen%20Thanh%20Market!5e0!3m2!1sen!2svn!4v1620000000000!5m2!1sen!2svn" 
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
