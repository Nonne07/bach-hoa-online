"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const method = searchParams.get("method");
  
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");

  useEffect(() => {
    if (!orderId) {
      const errorTimer = setTimeout(() => setStatus("error"), 0);
      return () => clearTimeout(errorTimer);
    }

    // Mock payment processing
    const timer = setTimeout(() => {
      // 90% chance of success for demo
      if (Math.random() > 0.1) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <div className="max-w-md mx-auto bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white text-center relative z-10 hover:shadow-brand-500/10 transition-all duration-500">
      {status === "processing" && (
        <div className="space-y-8 flex flex-col items-center">
          <div className="relative">
            <Loader2 className="w-20 h-20 text-brand-500 animate-spin relative z-10" />
            <div className="absolute inset-0 bg-brand-500/30 blur-2xl rounded-full"></div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Đang xử lý thanh toán</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Cổng thanh toán {method === "MOMO" ? "MoMo / ZaloPay" : "ATM / Internet Banking"}.<br />
              Mã đơn hàng: <span className="font-bold text-slate-900">#{orderId?.slice(-6).toUpperCase()}</span><br />
              <span className="text-brand-600 block mt-2">Vui lòng không đóng trình duyệt lúc này.</span>
            </p>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-green-500/30 transform hover:scale-110 hover:rotate-6 transition-all duration-500">
            <CheckCircle className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Thanh toán thành công!</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Đơn hàng <span className="font-bold text-slate-900">#{orderId?.slice(-6).toUpperCase()}</span> đã được thanh toán.<br />
              Cảm ơn bạn đã mua sắm tại Bách Hóa Online.
            </p>
          </div>
          <button onClick={() => router.push("/orders")} className="w-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold text-lg py-5 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1">
            Xem đơn hàng của tôi
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-red-500/30 transform hover:scale-110 hover:-rotate-6 transition-all duration-500">
            <AlertCircle className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Thanh toán thất bại</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Đã có lỗi xảy ra trong quá trình thanh toán.<br />
              Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
            </p>
          </div>
          <button onClick={() => router.push("/checkout")} className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg py-5 rounded-2xl hover:border-brand-500 hover:text-brand-600 transition-all hover:-translate-y-1 shadow-sm">
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/20 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <Suspense fallback={<div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-200 border-t-brand-500"></div>}>
        <PaymentContent />
      </Suspense>
    </div>
  );
}
