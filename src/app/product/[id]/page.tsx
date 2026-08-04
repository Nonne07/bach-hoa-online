"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { api, Product } from "@/lib/api";
import { useCartStore } from "@/store/useCartStore";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { id } = await params;
      const data = await api.getProductById(id);
      if (data) {
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Sản phẩm không tồn tại</h2>
        <p className="text-slate-600 mb-6">Sản phẩm bạn đang tìm kiếm có thể đã bị xóa hoặc không còn hoạt động.</p>
        <Link href="/shop">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Quay lại cửa hàng</Button>
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  // Generate thumbnail variations from main image
  const galleryImages = [
    product.image || "/images/premium_beef_1785741941389.png",
    product.image || "/images/fresh_salmon_1785741952594.png",
    product.image || "/images/fresh_organic_tomatoes_1785741816028.png",
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50">
      {/* Breadcrumb / Back button */}
      <div className="mb-8">
        <Link href="/shop" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại cửa hàng
        </Link>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-white mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl relative overflow-hidden group border border-slate-100">
              {galleryImages[activeImageIndex] ? (
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">Không có hình ảnh</div>
              )}
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`aspect-square bg-slate-50 rounded-xl relative overflow-hidden cursor-pointer border-2 transition-all ${
                    i === activeImageIndex ? "border-brand-500 ring-2 ring-brand-500/20" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Góc nhìn ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="text-brand-600 font-semibold text-sm uppercase tracking-wide mb-2">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-slate-500 text-sm">(124 đánh giá)</span>
                <span className="text-slate-300">|</span>
                <span className="text-brand-600 text-sm font-medium flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Đã kiểm định VietGAP
                </span>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-brand-600">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-slate-400 line-through mb-1">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-sm font-bold ml-2 mb-1">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-slate-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-8 mt-auto">
              <div className="flex items-center gap-6 mb-6">
                <div className="font-medium text-slate-700">Số lượng:</div>
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-brand-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center font-semibold text-slate-700 border-x border-slate-200">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-brand-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-slate-500 text-sm">Còn hàng (Sẵn sàng giao)</div>
              </div>

              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full rounded-xl text-lg shadow-xl shadow-brand-500/30 bg-gradient-to-r from-brand-500 to-brand-400 border-none text-white transition-all hover:shadow-brand-500/50"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" /> Thêm vào giỏ hàng
                  </Button>
                </motion.div>
                <Button variant="outline" size="lg" className="px-4 rounded-xl">
                  <Heart className="w-6 h-6" />
                </Button>
                <Button variant="outline" size="lg" className="px-4 rounded-xl hidden sm:flex">
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600">Giao hàng 2h</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600">Nông sản sạch</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600">Đổi trả 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

