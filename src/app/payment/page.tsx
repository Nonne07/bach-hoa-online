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
      setStatus("error");
      return;
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
    <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 text-center">
      {status === "processing" && (
        <div className="space-y-6 flex flex-col items-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-brand-500 animate-spin" />
            <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Đang xử lý thanh toán</h2>
          <p className="text-slate-600">
            Cổng thanh toán {method === "MOMO" ? "MoMo / ZaloPay" : "ATM / Internet Banking"}.<br />
            Mã đơn hàng: <span className="font-bold">#{orderId?.slice(-6).toUpperCase()}</span><br />
            Vui lòng không đóng trình duyệt lúc này.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Thanh toán thành công!</h2>
          <p className="text-slate-600">
            Đơn hàng <span className="font-bold">#{orderId?.slice(-6).toUpperCase()}</span> đã được thanh toán.<br />
            Cảm ơn bạn đã mua sắm tại Bách Hóa Online.
          </p>
          <Button onClick={() => router.push("/orders")} className="w-full rounded-xl">
            Xem đơn hàng của tôi
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-2">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Thanh toán thất bại</h2>
          <p className="text-slate-600">
            Đã có lỗi xảy ra trong quá trình thanh toán.<br />
            Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
          </p>
          <Button onClick={() => router.push("/checkout")} className="w-full rounded-xl" variant="outline">
            Thử lại
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-slate-50">
      <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>}>
        <PaymentContent />
      </Suspense>
    </div>
  );
}
