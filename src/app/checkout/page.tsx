"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const formatPrice = (p: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      alert("Vui lòng đăng nhập để tiến hành đặt hàng!");
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const paymentMethod = formData.get("payment") as string;
      const fullName = formData.get("fullName") as string;
      const phone = formData.get("phone") as string;
      const address = formData.get("address") as string;
      const notes = formData.get("notes") as string;
      
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          subtotal,
          shipping,
          total,
          paymentMethod,
          fullName,
          phone,
          address,
          notes
        })
      });
      
      if (!res.ok) {
        throw new Error("Checkout failed");
      }
      
      const data = await res.json();
      
      clearCart();
      
      if (paymentMethod !== "COD") {
        router.push(`/payment?orderId=${data.orderId}&method=${paymentMethod}`);
      } else {
        router.push(`/orders?success=true`);
      }
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-brand-300/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-4">
          <div className="bg-brand-100 p-3 rounded-2xl shadow-inner text-brand-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          Hoàn tất đơn hàng
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="bg-brand-100 text-brand-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Thông tin giao hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full md:col-span-1 group">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Họ và tên</label>
                <input required type="text" name="fullName" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm group-hover:border-slate-300" placeholder="Nguyễn Văn A" />
              </div>
              <div className="col-span-full md:col-span-1 group">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Số điện thoại</label>
                <input required type="tel" name="phone" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm group-hover:border-slate-300" placeholder="0901234567" />
              </div>
              <div className="col-span-full group">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Địa chỉ nhận hàng</label>
                <input required type="text" name="address" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm group-hover:border-slate-300" placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" />
              </div>
              <div className="col-span-full group">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Ghi chú (Tùy chọn)</label>
                <textarea rows={3} name="notes" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm group-hover:border-slate-300 resize-none" placeholder="Ví dụ: Giao giờ hành chính"></textarea>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="bg-brand-100 text-brand-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Phương thức thanh toán
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-5 border-2 border-brand-500 bg-brand-50/50 rounded-2xl cursor-pointer shadow-sm relative overflow-hidden transition-all">
                <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay"></div>
                <input type="radio" name="payment" value="COD" defaultChecked className="text-brand-500 focus:ring-brand-500 w-5 h-5 relative z-10" />
                <span className="font-bold text-brand-900 relative z-10">Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label className="flex items-center gap-4 p-5 border-2 border-transparent bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all">
                <input type="radio" name="payment" value="ATM" className="text-brand-500 focus:ring-brand-500 w-5 h-5" />
                <span className="font-bold text-slate-700">Thẻ ATM / Internet Banking</span>
              </label>
              <label className="flex items-center gap-4 p-5 border-2 border-transparent bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all">
                <input type="radio" name="payment" value="MOMO" className="text-brand-500 focus:ring-brand-500 w-5 h-5" />
                <span className="font-bold text-slate-700">Ví MoMo / ZaloPay</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary (Static for checkout) */}
        <div className="w-full lg:w-[420px] shrink-0">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-900/20 sticky top-28 text-white border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-8">Đơn hàng của bạn</h2>
            
            <div className="space-y-4 mb-8">
              {!mounted ? (
                <div className="text-sm text-slate-400">Đang tải...</div>
              ) : cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 line-clamp-1 pr-4">{item.name} <span className="text-brand-400 font-bold ml-1">x{item.quantity}</span></span>
                  <span className="font-bold text-white shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-slate-700/50 pt-4 mt-6"></div>
              <div className="flex justify-between text-slate-300 text-lg mt-4">
                <span>Tạm tính</span>
                <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-300 text-lg">
                <span>Phí giao hàng</span>
                <span className="font-semibold text-brand-400">{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
              </div>
            </div>
            
            <div className="border-t border-slate-700/50 pt-6 mb-10">
              <div className="flex justify-between items-end">
                <span className="text-xl font-bold text-slate-200">Tổng cộng</span>
                <span className="text-3xl font-black text-brand-400">{formatPrice(total)}</span>
              </div>
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold text-lg py-5 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1 flex justify-center items-center gap-3 group">
              <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /> {loading ? "Đang xử lý..." : "Đặt hàng ngay"}
            </button>
            <p className="text-xs text-center text-slate-400 mt-6 font-medium">
              Bằng việc đặt hàng, bạn đồng ý với <Link href="#" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">Điều khoản</Link> của Bách Hóa Online
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
