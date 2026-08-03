import React from "react";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const usersCount = await prisma.user.count();
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  
  // Aggregate total revenue
  const revenueResult = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: "PAID" }
  });
  const totalRevenue = revenueResult._sum.total || 0;

  const STATS = [
    { title: "Tổng doanh thu", value: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalRevenue), icon: DollarSign, color: "text-brand-600 bg-brand-100" },
    { title: "Đơn hàng mới", value: ordersCount.toString(), icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
    { title: "Khách hàng mới", value: usersCount.toString(), icon: Users, color: "text-orange-600 bg-orange-100" },
    { title: "Tổng sản phẩm", value: productsCount.toString(), icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
  ];

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true, items: true }
  });

  const topProducts = await prisma.product.findMany({
    take: 5,
    orderBy: { price: "desc" } // Ideally order by orderItem count, but for demo this is fine
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-slate-500 font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Đơn hàng gần đây</h3>
          <div className="space-y-4">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">#{order.id.slice(-6).toUpperCase()}</span>
                  <span className="text-xs text-slate-500">{order.user.name} • {order.items.reduce((a, b) => a + b.quantity, 0)} sản phẩm</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-brand-600">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                  </span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1">
                    {order.status}
                  </span>
                </div>
              </div>
            )) : <p className="text-slate-500 text-sm">Chưa có đơn hàng nào.</p>}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Sản phẩm nổi bật</h3>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50">
                <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0"></div>
                <div className="flex-1">
                  <span className="font-bold text-slate-800 line-clamp-1">{product.name}</span>
                  <span className="text-xs text-slate-500">{product.category} • {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</span>
                </div>
                <div className="font-bold text-slate-800 shrink-0 text-sm">
                  Kho: {product.stock}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
