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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-slate-900 dark:text-slate-100" />
              <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">Lọc sản phẩm</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Danh mục</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4" defaultChecked />
                    <span className="text-slate-600 dark:text-slate-300">Tất cả</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4" />
                      <span className="text-slate-600 dark:text-slate-300">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Mức giá</h3>
                <div className="space-y-2">
                  {["Dưới 50.000đ", "50.000đ - 200.000đ", "200.000đ - 500.000đ", "Trên 500.000đ"].map((price) => (
                    <label key={price} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="price" className="text-brand-500 focus:ring-brand-500 w-4 h-4" />
                      <span className="text-slate-600 dark:text-slate-300">{price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Tất cả sản phẩm</h1>
            <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Mới nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Bán chạy nhất</option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
          
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="w-48">
              Xem thêm
            </Button>
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
