import React from "react";
import { User, Package, MapPin, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AlertButton } from "@/components/ui/AlertButton";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";

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
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse"></div>
      
      <div className="flex flex-col md:flex-row gap-10 relative z-10">
        {/* Sidebar Navigation */}
        <ProfileSidebar userName={session?.user?.name} />

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-white">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight flex items-center gap-3">
              <div className="bg-brand-100 p-2 rounded-xl text-brand-600">
                <Package className="w-6 h-6" />
              </div>
              Quản lý đơn hàng
            </h1>
            
            <div className="space-y-6">
              {userOrders.length === 0 ? (
                <div className="text-center py-20 text-slate-500 font-medium bg-slate-50 rounded-[2rem] border border-dashed border-slate-300">
                  <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  Bạn chưa có đơn hàng nào.
                </div>
              ) : userOrders.map((order) => {
                const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
                let color = "text-blue-600 bg-blue-50 border-blue-200";
                if (order.status === "PAID") color = "text-brand-600 bg-brand-50 border-brand-200";
                else if (order.status === "CANCELLED") color = "text-red-600 bg-red-50 border-red-200";
                
                return (
                  <div key={order.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 group">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div>
                        <span className="font-extrabold text-lg text-slate-900 block sm:inline mr-4">#{order.id.slice(-6).toUpperCase()}</span>
                        <span className="text-slate-500 font-medium">{order.createdAt.toLocaleDateString("vi-VN")}</span>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${color}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap justify-between items-center gap-6">
                      <div className="text-slate-600 font-medium bg-slate-50 px-4 py-2 rounded-xl">
                        <span className="font-bold text-slate-900">{itemsCount}</span> sản phẩm
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng tiền</div>
                          <div className="font-black text-brand-600 text-2xl">
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                          </div>
                        </div>
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl font-bold border-slate-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-all group">
                            Chi tiết <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
