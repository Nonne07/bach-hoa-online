"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const formatPrice = (p: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const paymentMethod = formData.get("payment") as string;
      
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          subtotal,
          shipping,
          total,
          paymentMethod
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Thanh toán</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Thông tin giao hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Nguyễn Văn A" />
              </div>
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
                <input required type="tel" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="0901234567" />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ nhận hàng</label>
                <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú (Tùy chọn)</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ví dụ: Giao giờ hành chính"></textarea>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Phương thức thanh toán</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-brand-500 bg-brand-50 rounded-xl cursor-pointer">
                <input type="radio" name="payment" value="COD" defaultChecked className="text-brand-500 focus:ring-brand-500 w-5 h-5" />
                <span className="font-medium text-brand-900">Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="radio" name="payment" value="ATM" className="text-brand-500 focus:ring-brand-500 w-5 h-5" />
                <span className="font-medium text-slate-700">Thẻ ATM / Internet Banking</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="radio" name="payment" value="MOMO" className="text-brand-500 focus:ring-brand-500 w-5 h-5" />
                <span className="font-medium text-slate-700">Ví MoMo / ZaloPay</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary (Static for checkout) */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Đơn hàng của bạn</h2>
            
            <div className="space-y-4 mb-6">
              {!mounted ? (
                <div className="text-sm text-slate-500">Đang tải...</div>
              ) : cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 line-clamp-1 pr-4">{item.name} x{item.quantity}</span>
                  <span className="font-medium text-slate-900 shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-4 mt-4"></div>
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính</span>
                <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí giao hàng</span>
                <span className="font-medium text-slate-900">{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-slate-900">Tổng cộng</span>
                <span className="text-2xl font-bold text-brand-600">{formatPrice(total)}</span>
              </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full rounded-xl shadow-lg shadow-brand-500/30">
              <CheckCircle className="w-5 h-5 mr-2" /> Đặt hàng
            </Button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Bằng việc đặt hàng, bạn đồng ý với <Link href="#" className="text-brand-500 hover:underline">Điều khoản</Link> của Bách Hóa Online
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
