import React from "react";
import { User, Package, MapPin, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/ui/SignOutButton";

export default async function OrdersPage() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const userOrders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 p-4 border-b border-slate-100 mb-2">
            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
              <span className="font-bold">{session.user.name?.charAt(0) || <User className="w-6 h-6" />}</span>
            </div>
            <div>
              <div className="font-bold text-slate-800">{session.user.name}</div>
              <div className="text-xs text-slate-500">Thành viên</div>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <User className="w-5 h-5" /> Thông tin tài khoản
            </Link>
            <Link href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 text-brand-600 font-medium">
              <Package className="w-5 h-5" /> Quản lý đơn hàng
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <MapPin className="w-5 h-5" /> Sổ địa chỉ
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <Settings className="w-5 h-5" /> Cài đặt thông báo
            </Link>
            <div className="mt-4 px-2">
              <SignOutButton />
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Quản lý đơn hàng</h1>
          
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                Bạn chưa có đơn hàng nào.
              </div>
            ) : userOrders.map((order) => {
              const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
              let color = "text-blue-600 bg-blue-50";
              if (order.status === "PAID") color = "text-brand-600 bg-brand-50";
              else if (order.status === "CANCELLED") color = "text-red-600 bg-red-50";
              
              return (
                <div key={order.id} className="border border-slate-200 rounded-2xl p-4 sm:p-6 hover:border-brand-300 transition-colors">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div>
                      <span className="font-bold text-slate-900 block sm:inline mr-4">#{order.id.slice(-6).toUpperCase()}</span>
                      <span className="text-slate-500 text-sm">{order.createdAt.toLocaleDateString("vi-VN")}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${color}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="text-slate-600">
                      <span className="font-medium text-slate-900">{itemsCount}</span> sản phẩm
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Tổng tiền</div>
                        <div className="font-bold text-brand-600 text-lg">
                          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hidden sm:flex rounded-lg">
                        Chi tiết <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
