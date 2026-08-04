"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Clock, Leaf, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { api, Product } from "@/lib/api";

const BENTO_CATEGORIES = [
  { name: "Thịt cá tươi sống", desc: "Hải sản & Thịt nhập khẩu", img: "/images/premium_beef_1785741941389.png", href: "/shop/meat", span: "col-span-1 md:col-span-2 row-span-2", color: "from-red-500/20 to-orange-500/20" },
  { name: "Rau củ hữu cơ", desc: "Thu hoạch trong ngày", img: "/images/fresh_organic_tomatoes_1785741816028.png", href: "/shop/veggies", span: "col-span-1 md:col-span-1 row-span-1", color: "from-emerald-500/20 to-teal-500/20" },
  { name: "Trái cây nhập khẩu", desc: "Tươi ngon mọng nước", img: "/images/fresh_salmon_1785741952594.png", href: "/shop/fruits", span: "col-span-1 md:col-span-1 row-span-1", color: "from-purple-500/20 to-pink-500/20" },
  { name: "Đồ uống & Trà", desc: "Thanh lọc cơ thể", img: "/images/hero_banner_fresh.png", href: "/shop/drinks", span: "col-span-1 md:col-span-2 row-span-1", color: "from-blue-500/20 to-cyan-500/20" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
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
    <div className="flex flex-col gap-32 pb-32 bg-slate-50 overflow-hidden">
      
      {/* 1. HERO SECTION - VIBRANT & SMOOTH */}
      <section ref={heroRef} className="relative h-[95vh] min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-[#051c14]">
        {/* Animated Background Gradient Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-500/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-600/20 blur-[150px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
          <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-green-500/10 blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
        </div>

        {/* Floating image layer - Huge rotated parallax */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]) }}
          className="absolute -bottom-[30%] right-[-10%] w-[60vw] h-[60vw] min-w-[700px] opacity-60 rotate-[-15deg] pointer-events-none drop-shadow-[0_0_80px_rgba(34,197,94,0.3)] z-0"
        >
          <Image src="/images/hero_banner_fresh.png" alt="Fresh Produce" fill className="object-cover rounded-[120px]" />
        </motion.div>

        <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center pt-20">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
          >
            <Leaf className="w-5 h-5 text-brand-400" />
            <span className="text-white/90 font-medium tracking-wide uppercase text-sm">Tiêu chuẩn hữu cơ 2026</span>
          </motion.div>

          {/* Fixed text size to prevent overflow/cutting */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black tracking-tight text-white leading-[1.1] mb-6 w-full"
          >
            Tươi Ngon.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-green-300 drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              Sạch Tinh Khiết.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10"
          >
            Định nghĩa lại trải nghiệm mua sắm thực phẩm. Trực tiếp từ nông trại đến bàn ăn của bạn chỉ trong 2 giờ.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 relative z-10"
          >
            <Link href="/shop">
              <button className="relative group px-10 py-5 rounded-full bg-white text-slate-950 font-bold text-lg flex items-center justify-center gap-3 overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                <span className="relative z-10">Mua Sắm Ngay</span>
                <ChevronRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
            <Link href="/shop/veggies">
              <button className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 shadow-2xl">
                Rau Củ Hữu Cơ
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Animated Slideshow (Ảnh Động) - Moved to bottom left to prevent overlap */}
        <div className="absolute bottom-24 left-6 md:left-16 w-32 h-32 md:w-56 md:h-56 rounded-[2rem] border-4 border-white/20 shadow-[0_20px_50px_rgba(34,197,94,0.4)] overflow-hidden z-20 backdrop-blur-md hidden xl:block">
          <motion.div animate={{ opacity: [1, 0, 0, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.33, 0.66, 1], ease: "easeInOut" }} className="absolute inset-0 z-30">
            <Image src="/images/fresh_salmon_1785741952594.png" alt="Salmon" fill className="object-cover scale-110" />
          </motion.div>
          <motion.div animate={{ opacity: [0, 1, 0, 0] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.33, 0.66, 1], ease: "easeInOut" }} className="absolute inset-0 z-20">
            <Image src="/images/fresh_organic_tomatoes_1785741816028.png" alt="Tomatoes" fill className="object-cover scale-110" />
          </motion.div>
          <motion.div animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.33, 0.66, 1], ease: "easeInOut" }} className="absolute inset-0 z-10">
            <Image src="/images/premium_beef_1785741941389.png" alt="Beef" fill className="object-cover scale-110" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-40 flex items-end p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Trực Tiếp</span>
            </div>
          </div>
        </div>
        
        {/* Floating Badge - Moved to top right to prevent overlap */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-6 md:right-16 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white flex items-center gap-4 z-30 hidden xl:flex"
        >
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
            <Truck className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <p className="text-slate-900 font-extrabold">Giao hàng 2H</p>
            <p className="text-slate-500 font-medium text-sm">Miễn phí &lt; 5km</p>
          </div>
        </motion.div>

        {/* Curved Gradient Transition to next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-20" />
      </section>

      {/* 2. STATS & TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Giao Hàng Siêu Tốc", sub: "Trực tiếp trong 2 giờ", icon: Truck },
            { title: "Kiểm Định VietGAP", sub: "100% nông sản sạch", icon: ShieldCheck },
            { title: "Đổi Trả Dễ Dàng", sub: "Miễn phí trong 24h", icon: Clock }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center text-center gap-5 group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-500 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500">
                <item.icon className="w-10 h-10 text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-lg">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. BENTO BOX CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4">Danh Mục</span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">Trải nghiệm mua sắm mới</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
          {BENTO_CATEGORIES.map((cat, i) => (
            <Link key={i} href={cat.href} className={`${cat.span} group`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`relative w-full h-full min-h-[250px] rounded-[3rem] overflow-hidden shadow-lg bg-gradient-to-br ${cat.color} p-10 flex flex-col justify-end`}
              >
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute top-0 right-0 w-full h-full">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover opacity-60 mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out" />
                </div>
                <div className="relative z-20 transform group-hover:-translate-y-4 transition-transform duration-500">
                  <h3 className="text-4xl font-bold text-slate-900 mb-3">{cat.name}</h3>
                  <p className="text-slate-800 text-lg font-medium bg-white/50 backdrop-blur-md inline-block px-4 py-2 rounded-full">{cat.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. PREMIUM PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">Bán Chạy Nhất</span>
            <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">Lựa Chọn Hoàn Hảo</h2>
          </div>
          <Link href="/shop" className="hidden md:flex items-center px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-brand-600 transition-colors shadow-xl">
            Xem Tất Cả <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 5. GIGANTIC PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-[4rem] overflow-hidden bg-slate-950 p-12 md:p-24 flex flex-col items-center text-center shadow-[0_30px_60px_-15px_rgba(16,185,129,0.3)] group"
        >
          <div className="absolute inset-0">
            <Image src="/images/promo_banner_1785741884419.png" alt="Promo" fill className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-500/20 text-brand-400 font-bold uppercase tracking-widest mb-8 border border-brand-500/30">
              <Star className="w-4 h-4 fill-brand-400" /> Đặc Quyền Khách Hàng Mới
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-10">
              Giảm Giá <span className="text-brand-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]">50%</span><br/>Cho Đơn Đầu Tiên
            </h2>
            <Link href="/shop">
              <button className="px-12 py-6 rounded-full bg-brand-500 text-white font-bold text-xl hover:bg-brand-400 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.8)] flex items-center gap-4 group/btn">
                Săn Ưu Đãi Ngay <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
