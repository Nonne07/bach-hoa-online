import React from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Package, ArrowLeft, CheckCircle2, Truck, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id, userId: session.user.id },
    include: { 
      items: {
        include: {
          product: true
        }
      } 
    }
  });

  if (!order) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800">Không tìm thấy đơn hàng</h1>
        <Link href="/orders" className="text-brand-600 hover:underline mt-4 inline-block">Quay lại danh sách đơn hàng</Link>
      </div>
    );
  }

  let statusColor = "text-blue-600 bg-blue-50 border-blue-200";
  let statusText = "Đang xử lý";
  if (order.status === "PAID") {
    statusColor = "text-brand-600 bg-brand-50 border-brand-200";
    statusText = "Đã thanh toán";
  } else if (order.status === "CANCELLED") {
    statusColor = "text-red-600 bg-red-50 border-red-200";
    statusText = "Đã hủy";
  }

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/orders" className="flex items-center text-slate-500 hover:text-brand-600 transition-colors font-semibold">
          <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                Chi tiết đơn hàng <span className="text-brand-600">#{order.id.slice(-6).toUpperCase()}</span>
              </h1>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mt-2">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {order.createdAt.toLocaleString("vi-VN")}</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest border ${statusColor}`}>
              {statusText}
            </span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden sm:block -z-10"></div>
            
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-900">Đặt hàng</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'PAID' ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 text-slate-400'}`}>
                <Package className="w-5 h-5" />
              </div>
              <span className={`text-sm font-bold ${order.status === 'PAID' ? 'text-slate-900' : 'text-slate-400'}`}>Đóng gói</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-400">Giao hàng</span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Sản phẩm đã mua</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-brand-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl relative overflow-hidden">
                    {item.product.image && <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.product.name}</h3>
                    <div className="text-sm text-slate-500">Số lượng: <span className="font-semibold text-slate-700">{item.quantity}</span></div>
                  </div>
                </div>
                <div className="font-bold text-slate-900">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-slate-600">Tổng cộng</span>
              <span className="font-black text-2xl text-brand-600">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
