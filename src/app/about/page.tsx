"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Leaf, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="bg-brand-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <Image
          src="/images/about_background_1785742052786.png"
          alt="About Us Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Câu chuyện của chúng tôi</h1>
          <p className="text-xl text-brand-50 leading-relaxed">
            Hành trình mang thực phẩm sạch, an toàn và tươi ngon đến mọi bữa ăn gia đình Việt.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Sứ mệnh của Bách Hóa Online</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Được thành lập vào năm 2026, Bách Hóa Online ra đời với mong muốn giải quyết nỗi lo của người tiêu dùng về chất lượng thực phẩm hàng ngày.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Chúng tôi kết nối trực tiếp với các nông trại đạt chuẩn VietGAP, GlobalGAP và các nhà cung cấp uy tín để đảm bảo nguồn gốc rõ ràng, không hóa chất độc hại, giữ trọn vẹn sự tươi ngon khi đến tay khách hàng.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  <Leaf className="w-4 h-4" />
                </div>
                100% Thực phẩm có nguồn gốc rõ ràng
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  <Heart className="w-4 h-4" />
                </div>
                Chăm sóc sức khỏe cộng đồng
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] bg-slate-100 rounded-3xl overflow-hidden">
            <Image
              src="/images/nong_trai_sach_1785742061860.png"
              alt="Nông trại sạch"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Những nguyên tắc chúng tôi luôn tuân thủ trong mọi hoạt động.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Chất lượng hàng đầu</h3>
              <p className="text-slate-600">Kiểm định nghiêm ngặt từ khâu thu hoạch đến bảo quản và vận chuyển.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tận tâm phục vụ</h3>
              <p className="text-slate-600">Luôn đặt khách hàng làm trọng tâm, lắng nghe và cải thiện không ngừng.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Nhanh chóng & Tiện lợi</h3>
              <p className="text-slate-600">Giao hàng đúng hẹn, đúng chất lượng, bảo quản chuyên nghiệp trên mọi nẻo đường.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
