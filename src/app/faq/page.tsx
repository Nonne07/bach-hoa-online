"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    category: "Giao hàng & Vận chuyển",
    questions: [
      { q: "Thời gian giao hàng là bao lâu?", a: "Chúng tôi cam kết giao hàng trong vòng 2 giờ kể từ khi xác nhận đơn hàng thành công đối với khu vực nội thành. Các khu vực khác có thể mất từ 4-6 giờ." },
      { q: "Phí giao hàng được tính như thế nào?", a: "Phí giao hàng mặc định là 30.000đ. Đơn hàng từ 500.000đ trở lên sẽ được miễn phí giao hàng hoàn toàn." },
      { q: "Tôi có thể kiểm tra hàng trước khi nhận không?", a: "Có, quý khách hoàn toàn có quyền kiểm tra số lượng và chất lượng sản phẩm trước khi thanh toán cho nhân viên giao hàng." }
    ]
  },
  {
    category: "Đổi trả & Hoàn tiền",
    questions: [
      { q: "Chính sách đổi trả sản phẩm tươi sống?", a: "Đối với thực phẩm tươi sống (thịt, cá, rau củ), quý khách vui lòng kiểm tra ngay khi nhận hàng. Chúng tôi hỗ trợ đổi trả trong vòng 24h nếu sản phẩm có lỗi từ nhà cung cấp (hư hỏng, ôi thiu)." },
      { q: "Thời gian hoàn tiền là bao lâu?", a: "Nếu thanh toán qua thẻ/ví điện tử, tiền sẽ được hoàn lại vào tài khoản của quý khách trong vòng 3-5 ngày làm việc tùy thuộc vào ngân hàng." }
    ]
  },
  {
    category: "Thanh toán & Đơn hàng",
    questions: [
      { q: "Tôi có thể thanh toán bằng những hình thức nào?", a: "Bách Hóa Online hỗ trợ thanh toán tiền mặt khi nhận hàng (COD), thẻ ATM nội địa, thẻ tín dụng (Visa/Mastercard), và các ví điện tử như MoMo, ZaloPay." },
      { q: "Làm sao để hủy đơn hàng?", a: "Quý khách có thể hủy đơn hàng trực tiếp trên mục 'Quản lý đơn hàng' trong tài khoản cá nhân, hoặc gọi đến Hotline 1900 1234 trước khi đơn hàng chuyển sang trạng thái 'Đang giao hàng'." }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleOpen = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="text-center mb-20 relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-brand-400 to-brand-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-500/30 transform hover:scale-110 hover:rotate-[15deg] transition-all duration-500">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 mb-6 tracking-tight">Câu hỏi thường gặp</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Tìm câu trả lời cho những thắc mắc phổ biến nhất của khách hàng.
        </p>
      </div>

      <div className="space-y-16 relative z-10">
        {FAQS.map((section, sIndex) => (
          <div key={sIndex} className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-white hover:shadow-2xl hover:shadow-brand-500/10 transition-shadow duration-500">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-sm">{sIndex + 1}</span>
              {section.category}
            </h2>
            <div className="space-y-6">
              {section.questions.map((faq, qIndex) => {
                const id = `${sIndex}-${qIndex}`;
                const isOpen = openIndex === id;
                return (
                  <div key={qIndex} className={`bg-slate-50 rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-brand-300 shadow-md shadow-brand-500/5' : 'border-slate-200'}`}>
                    <button
                      onClick={() => toggleOpen(id)}
                      className="w-full flex items-center justify-between p-6 text-left bg-transparent hover:bg-white transition-colors focus:outline-none"
                    >
                      <span className={`font-bold pr-8 text-lg ${isOpen ? 'text-brand-600' : 'text-slate-800'}`}>{faq.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-100 text-brand-600' : 'bg-slate-200 text-slate-500'}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-white"
                        >
                          <div className="p-6 pt-2 text-slate-600 font-medium leading-relaxed border-t border-slate-100/50">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
