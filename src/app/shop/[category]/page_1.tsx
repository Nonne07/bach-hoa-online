"use client";

import React, { useState, useEffect, use } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { api, Product } from "@/lib/api";

const CATEGORY_MAP: Record<string, string> = {
  meat: "Thịt cá",
  veggies: "Rau củ",
  drinks: "Đồ uống",
  fruits: "Trái cây"
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categoryKey = resolvedParams.category;
  const categoryName = CATEGORY_MAP[categoryKey] || "Danh mục";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      const allProducts = await api.getProducts(undefined, categoryName);
      setProducts(allProducts);
      setIsLoading(false);
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{categoryName}</h1>
        <p className="text-slate-500">Hiển thị {products.length} sản phẩm trong danh mục {categoryName.toLowerCase()}</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              Không tìm thấy sản phẩm nào trong danh mục này.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

