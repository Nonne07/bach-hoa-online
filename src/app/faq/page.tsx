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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Câu hỏi thường gặp</h1>
        <p className="text-lg text-slate-600">
          Tìm câu trả lời cho những thắc mắc phổ biến nhất của khách hàng.
        </p>
      </div>

      <div className="space-y-12">
        {FAQS.map((section, sIndex) => (
          <div key={sIndex}>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.questions.map((faq, qIndex) => {
                const id = `${sIndex}-${qIndex}`;
                const isOpen = openIndex === id;
                return (
                  <div key={qIndex} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleOpen(id)}
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none focus-visible:bg-slate-50"
                    >
                      <span className="font-semibold text-slate-800 pr-8">{faq.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 shrink-0"
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
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
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
