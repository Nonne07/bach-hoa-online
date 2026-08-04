"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const formatPrice = (p: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 flex items-center justify-center gap-4 tracking-tight">
          <div className="bg-brand-100 p-3 rounded-2xl shadow-inner text-brand-600">
            <ShoppingBag className="w-8 h-8" />
          </div>
          Giỏ hàng của bạn
        </h1>
      </div>

      {!mounted ? (
        <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"></div></div>
      ) : cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-white flex flex-col sm:flex-row items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-2xl relative overflow-hidden shrink-0 border border-slate-100 group-hover:shadow-md transition-all">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-400">Image</div>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left w-full">
                  <Link href={`/product/${item.id}`} className="font-bold text-lg text-slate-800 hover:text-brand-600 transition-colors line-clamp-1 mb-1">
                    {item.name}
                  </Link>
                  <div className="text-brand-600 font-bold text-xl">{formatPrice(item.price)}</div>
                </div>
                
                <div className="flex items-center gap-6 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-inner">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-white rounded-lg transition-all">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center font-bold text-slate-700">
                      {item.quantity}
                    </div>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-white rounded-lg transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button onClick={() => removeItem(item.id)} className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors shadow-sm">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-900/20 sticky top-28 text-white border border-slate-700">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-slate-300 text-lg">
                  <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-300 text-lg">
                  <span>Phí giao hàng</span>
                  <span className="font-semibold text-brand-400">{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-sm text-brand-300 bg-brand-500/20 border border-brand-500/30 p-4 rounded-xl flex items-start gap-3 mt-4 backdrop-blur-sm">
                    <div className="shrink-0 bg-brand-500 text-white rounded-full p-1 mt-0.5"><ArrowRight className="w-3 h-3" /></div>
                    Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí giao hàng!
                  </div>
                )}
              </div>
              
              <div className="border-t border-slate-700/50 pt-6 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold text-slate-200">Tổng cộng</span>
                  <span className="text-3xl font-black text-brand-400">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-slate-400 text-right mt-2 font-medium">(Đã bao gồm VAT)</p>
              </div>
              
              <Link href="/checkout" className="block">
                <button className="w-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold text-lg py-5 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1 flex justify-center items-center gap-3 group">
                  Tiến hành thanh toán <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-16 text-center shadow-xl shadow-slate-200/40 border border-white flex flex-col items-center max-w-2xl mx-auto">
          <ShoppingBag className="w-24 h-24 text-slate-200 mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Giỏ hàng của bạn đang trống</h2>
          <p className="text-slate-500 mb-8">Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tươi ngon của chúng tôi!</p>
          <Link href="/shop">
            <Button size="lg" className="rounded-full">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
