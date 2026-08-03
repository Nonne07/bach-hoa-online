"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { api, Product } from "@/lib/api";

const CATEGORIES = [
  { name: "Thịt cá tươi sống", icon: "🥩", href: "/shop/meat", color: "bg-red-100 text-red-600" },
  { name: "Rau củ hữu cơ", icon: "🥬", href: "/shop/veggies", color: "bg-brand-100 text-brand-600" },
  { name: "Trái cây nhập khẩu", icon: "🍎", href: "/shop/fruits", color: "bg-orange-100 text-orange-600" },
  { name: "Đồ uống & Trà", icon: "🥤", href: "/shop/drinks", color: "bg-blue-100 text-blue-600" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await api.getProducts();
      setProducts(fetchedProducts.slice(0, 4));
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-brand-950 origin-top"
        >
          <Image
            src="/images/hero_background_1785741870451.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-50 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-brand-950/40 to-brand-900/80 z-10" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col items-center text-center pt-20">
          <motion.div 
            style={{ y: textY, opacity }}
            className="max-w-3xl flex flex-col items-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block px-5 py-2.5 rounded-full glass-dark text-brand-300 font-semibold mb-8 text-sm tracking-wider uppercase shadow-lg shadow-black/10"
            >
              Giảm giá 20% cho đơn hàng đầu tiên
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] text-white drop-shadow-xl"
            >
              Thực phẩm sạch,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">
                Sống khỏe mỗi ngày
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-xl md:text-2xl text-brand-50/90 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md"
            >
              Bách Hóa Online mang đến những sản phẩm tươi ngon nhất, chuẩn hữu cơ, giao hàng tận nơi chỉ trong 2 giờ.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full text-lg px-8 shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-1">
                  Mua sắm ngay <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10 border border-white"
        >
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="flex flex-col items-center text-center gap-4 group">
            <div className="bg-brand-50 w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-brand-500 transition-colors duration-500 shadow-inner">
              <Truck className="w-10 h-10 text-brand-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xl tracking-tight">Giao hàng 2 giờ</h3>
              <p className="text-slate-600 mt-2">Nhanh chóng và an toàn đến tận tay bạn</p>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="flex flex-col items-center text-center gap-4 group">
            <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors duration-500 shadow-inner">
              <ShieldCheck className="w-10 h-10 text-blue-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xl tracking-tight">100% An toàn</h3>
              <p className="text-slate-600 mt-2">Thực phẩm chuẩn hữu cơ, được kiểm định</p>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="flex flex-col items-center text-center gap-4 group">
            <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors duration-500 shadow-inner">
              <Clock className="w-10 h-10 text-orange-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xl tracking-tight">Phục vụ 24/7</h3>
              <p className="text-slate-600 mt-2">Hỗ trợ mọi lúc mọi nơi, không kể ngày đêm</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Danh mục nổi bật</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-lg font-medium">Khám phá các sản phẩm tươi ngon theo danh mục</p>
          </div>
          <Link href="/shop" className="hidden md:flex items-center text-brand-500 font-semibold hover:text-brand-400 hover:translate-x-1 transition-all duration-300">
            Xem tất cả <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {CATEGORIES.map((cat, index) => (
            <Link key={index} href={cat.href}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-[2rem] p-8 text-center shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100/60 transition-all duration-500 cursor-pointer group"
              >
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-6 transition-transform duration-500 group-hover:scale-110 ${cat.color}`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-xl">{cat.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Sản phẩm bán chạy</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-lg font-medium">Được chọn mua nhiều nhất trong tuần</p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-brand-900 rounded-[3rem] overflow-hidden relative min-h-[400px] shadow-2xl shadow-brand-900/20 group"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/promo_banner_1785741884419.png"
              alt="Promotional Banner"
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out mix-blend-luminosity"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/80 to-transparent z-10" />
          
          <div className="relative z-20 p-12 md:p-20 flex flex-col items-start md:w-2/3 lg:w-1/2 h-full justify-center">
            <span className="bg-gradient-to-r from-brand-400 to-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg shadow-brand-500/30">
              Khuyến mãi cuối tuần
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
              Giảm giá lên đến 50%
            </h2>
            <p className="text-brand-100 text-lg md:text-xl mb-10 max-w-md leading-relaxed drop-shadow">
              Nhanh tay mua sắm để nhận ngay ưu đãi hấp dẫn áp dụng cho tất cả thực phẩm tươi sống đến cuối tuần này.
            </p>
            <Link href="/shop/veggies">
              <Button size="lg" className="rounded-full shadow-2xl shadow-brand-500/40 hover:-translate-y-1">
                Mua ngay hôm nay
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
