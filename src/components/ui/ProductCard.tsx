"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
}

export function ProductCard({ id, name, price, originalPrice, image, category }: ProductCardProps) {
  const formatPrice = (p: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, originalPrice: originalPrice || null, image, category, description: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100/60 overflow-hidden transition-all duration-500 group flex flex-col h-full"
    >
      <Link href={`/product/${id}`} className="block relative aspect-[4/3] bg-slate-50/50 overflow-hidden p-6">
        {image ? (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-sm group-hover:drop-shadow-md"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium bg-slate-50 group-hover:scale-105 transition-transform duration-700">
            [Image Placeholder]
          </div>
        )}
        
        {originalPrice && (
          <div className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm shadow-brand-500/20">
            -{Math.round((1 - price / originalPrice) * 100)}%
          </div>
        )}
        
        {/* Reveal Add to Cart Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      </Link>
      
      <div className="p-6 pt-5 flex flex-col gap-3 flex-grow bg-white relative z-20">
        <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">{category}</div>
        <Link href={`/product/${id}`} className="flex-grow">
          <h3 className="font-semibold text-slate-900 text-lg leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors duration-300">
            {name}
          </h3>
        </Link>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between overflow-hidden relative min-h-[48px]">
          <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-12">
            <span className="font-bold text-slate-900 text-xl tracking-tight">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through mt-0.5">{formatPrice(originalPrice)}</span>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center">
             <Button 
              className="w-full text-sm font-semibold py-2.5 h-auto rounded-xl shadow-lg shadow-brand-500/30 bg-gradient-to-r from-brand-500 to-brand-400 border-none text-white transition-all hover:shadow-brand-500/50 hover:-translate-y-0.5"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
