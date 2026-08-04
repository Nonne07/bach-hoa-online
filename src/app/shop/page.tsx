"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api, Product, Category } from "@/lib/api";

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || undefined;
  const categoryQuery = searchParams.get("category") || undefined;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        api.getProducts(searchQuery, categoryQuery),
        api.getCategories()
      ]);
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
      setIsLoading(false);
    };
    fetchData();
  }, [searchQuery, categoryQuery]);

  return (
    <div className="pt-40 md:pt-48 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Premium Header */}
        <div className="mb-12 mt-4 bg-gradient-to-r from-emerald-900 to-teal-800 rounded-3xl p-10 md:p-16 flex flex-col items-center text-center shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero_banner_fresh.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 relative z-10 tracking-tight">Cửa Hàng Thực Phẩm Sạch</h1>
          <p className="text-emerald-100/80 max-w-2xl text-lg relative z-10">Khám phá hàng ngàn sản phẩm hữu cơ tươi ngon được thu hoạch và bảo quản với tiêu chuẩn khắt khe nhất.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Filters */}
          <div className="w-full md:w-72 shrink-0">
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 sticky top-28">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="bg-brand-100 p-2 rounded-xl text-brand-600">
                  <Filter className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-xl text-slate-900">Bộ lọc</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest">Danh mục</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="rounded-md border-slate-300 text-brand-500 focus:ring-brand-500 w-5 h-5 transition-colors cursor-pointer" defaultChecked />
                      <span className="text-slate-600 group-hover:text-brand-600 font-medium transition-colors">Tất cả</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="rounded-md border-slate-300 text-brand-500 focus:ring-brand-500 w-5 h-5 transition-colors cursor-pointer" />
                        <span className="text-slate-600 group-hover:text-brand-600 font-medium transition-colors">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest">Mức giá</h3>
                  <div className="space-y-3">
                    {["Dưới 50.000đ", "50.000đ - 200.000đ", "200.000đ - 500.000đ", "Trên 500.000đ"].map((price) => (
                      <label key={price} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="price" className="text-brand-500 focus:ring-brand-500 w-5 h-5 border-slate-300 cursor-pointer" />
                        <span className="text-slate-600 group-hover:text-brand-600 font-medium transition-colors">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100/50">
              <span className="text-slate-500 font-medium">Hiển thị <strong className="text-slate-900">{products.length}</strong> sản phẩm</span>
              <select className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm transition-all cursor-pointer">
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Bán chạy nhất</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"></div></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
            
            <div className="mt-16 flex justify-center">
              <Button className="px-10 py-6 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-brand-600 transition-colors shadow-xl">
                Tải thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>}>
      <ShopContent />
    </Suspense>
  );
}
