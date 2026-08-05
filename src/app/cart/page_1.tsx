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
    setMounted(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const formatPrice = (p: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-brand-500" />
        Giỏ hàng của bạn
      </h1>

      {!mounted ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>
      ) : cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-24 h-24 bg-slate-100 rounded-xl relative overflow-hidden shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-400">Image</div>
                  )}
                </div>
                <div className="flex-1">
                  <Link href={`/product/${item.id}`} className="font-semibold text-slate-800 hover:text-brand-500 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <div className="text-brand-600 font-bold mt-1">{formatPrice(item.price)}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-brand-500">
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center font-medium text-sm text-slate-700 border-x border-slate-200">
                      {item.quantity}
                    </div>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-brand-500">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                  <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Phí giao hàng</span>
                  <span className="font-medium text-slate-900">{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-brand-600 bg-brand-50 p-2 rounded-lg">
                    Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí giao hàng!
                  </div>
                )}
              </div>
              
              <div className="border-t border-slate-100 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900">Tổng cộng</span>
                  <span className="text-2xl font-bold text-brand-600">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-slate-500 text-right mt-1">(Đã bao gồm VAT)</p>
              </div>
              
              <Link href="/checkout">
                <Button size="lg" className="w-full rounded-xl shadow-lg shadow-brand-500/30">
                  Tiến hành thanh toán <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center">
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
