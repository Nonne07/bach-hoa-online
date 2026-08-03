import React from "react";
import Link from "next/link";
import { Leaf, MessageCircle, Globe, Camera, Play, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "../ui/Button";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 mt-12 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-brand-400 to-brand-600 p-2.5 rounded-2xl shadow-lg shadow-brand-500/20">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Bách Hóa <span className="text-brand-500">Online</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mua sắm thực phẩm tươi sạch mỗi ngày với giá tốt nhất. Giao hàng tận nơi nhanh chóng trong vòng 2 giờ.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Play className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Liên kết nhanh</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-brand-400 transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/shop" className="hover:text-brand-400 transition-colors">Sản phẩm</Link></li>
              <li><Link href="/faq" className="hover:text-brand-400 transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link href="/blog" className="hover:text-brand-400 transition-colors">Tin tức & Blog</Link></li>
              <li><Link href="/contact" className="hover:text-brand-400 transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span>support@bachhoaonline.vn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Đăng ký nhận tin</h3>
            <p className="text-sm text-slate-400 mb-4">Nhận thông tin khuyến mãi mới nhất từ chúng tôi.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white placeholder:text-slate-500"
              />
              <Button variant="primary" className="w-full">
                Đăng ký
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Bách Hóa Online. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
