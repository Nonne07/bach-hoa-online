"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Leaf, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pb-16 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about_background_1785742052786.png"
            alt="About Us Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/20 backdrop-blur-md uppercase tracking-widest shadow-xl">
            <span>✨</span> Về Bách Hóa Online
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight drop-shadow-2xl">
            Câu chuyện của chúng tôi
          </h1>
          <p className="text-2xl text-slate-200 leading-relaxed font-medium max-w-3xl mx-auto drop-shadow-md">
            Hành trình mang thực phẩm sạch, an toàn và tươi ngon đến mọi bữa ăn gia đình Việt.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">Sứ mệnh của Bách Hóa Online</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                Được thành lập vào năm 2026, Bách Hóa Online ra đời với mong muốn giải quyết nỗi lo của người tiêu dùng về chất lượng thực phẩm hàng ngày.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">
                Chúng tôi kết nối trực tiếp với các nông trại đạt chuẩn VietGAP, GlobalGAP và các nhà cung cấp uy tín để đảm bảo nguồn gốc rõ ràng, không hóa chất độc hại, giữ trọn vẹn sự tươi ngon khi đến tay khách hàng.
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-slate-800 font-bold text-lg bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                    <Leaf className="w-6 h-6" />
                  </div>
                  100% Thực phẩm nguồn gốc rõ ràng
                </li>
                <li className="flex items-center gap-4 text-slate-800 font-bold text-lg bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                    <Heart className="w-6 h-6" />
                  </div>
                  Chăm sóc sức khỏe cộng đồng
                </li>
              </ul>
            </div>
            <div className="relative h-[500px] bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-500/10 group">
              <Image
                src="/images/nong_trai_sach_1785742061860.png"
                alt="Nông trại sạch"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Giá trị cốt lõi</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">Những nguyên tắc chúng tôi luôn tuân thủ trong mọi hoạt động.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div whileHover={{ y: -15 }} className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white text-center hover:shadow-2xl hover:shadow-blue-500/10 transition-shadow">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30 transform rotate-3">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Chất lượng hàng đầu</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Kiểm định nghiêm ngặt từ khâu thu hoạch đến bảo quản và vận chuyển.</p>
          </motion.div>
          <motion.div whileHover={{ y: -15 }} className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white text-center hover:shadow-2xl hover:shadow-brand-500/10 transition-shadow mt-0 md:mt-12">
            <div className="w-24 h-24 bg-gradient-to-br from-brand-400 to-brand-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand-500/30 transform -rotate-3">
              <Heart className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Tận tâm phục vụ</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Luôn đặt khách hàng làm trọng tâm, lắng nghe và cải thiện không ngừng.</p>
          </motion.div>
          <motion.div whileHover={{ y: -15 }} className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white text-center hover:shadow-2xl hover:shadow-orange-500/10 transition-shadow">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-orange-500/30 transform rotate-3">
              <Truck className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Nhanh chóng & Tiện lợi</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Giao hàng đúng hẹn, đúng chất lượng, bảo quản chuyên nghiệp trên mọi nẻo đường.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
