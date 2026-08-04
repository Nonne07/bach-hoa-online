"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu, X, Leaf } from "lucide-react";
import { Button } from "../ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const NAV_LINKS = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/shop" },
  { name: "Thịt cá", href: "/shop/meat" },
  { name: "Rau củ", href: "/shop/veggies" },
  { name: "Đồ uống", href: "/shop/drinks" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center mt-6 px-4 transition-all duration-500">
      <header className="w-full max-w-5xl glass shadow-2xl shadow-brand-900/10 rounded-full border border-white/40 px-4 transition-all duration-500">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group ml-2">
            <div className="bg-gradient-to-br from-brand-400 to-brand-600 p-2 rounded-xl group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500 shadow-lg shadow-brand-500/30">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              Bách Hóa <span className="text-brand-500">Online</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 relative">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300",
                    isActive ? "text-brand-700" : "text-slate-600 hover:text-brand-600"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-brand-100 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const search = formData.get("search") as string;
              if (search) router.push(`/shop?search=${encodeURIComponent(search)}`);
            }} className="hidden lg:flex relative">
              <input
                name="search"
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2 w-64 bg-slate-100/80 border-transparent rounded-full focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all outline-none text-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            {session?.user ? (
              <Link href="/profile">
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-brand-50 text-brand-600">
                  <span className="font-bold">{session.user.name?.charAt(0) || <User className="w-5 h-5" />}</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/cart">
                <Button variant="primary" className="rounded-full w-10 h-10 p-0 flex items-center justify-center relative shadow-lg shadow-brand-500/30">
                  <ShoppingCart className="w-5 h-5" />
                  {mounted && totalItems > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              className="md:hidden rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100/20 bg-white/80 backdrop-blur-md rounded-b-3xl mt-2"
            >
              <div className="px-4 py-6 space-y-4">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-100/50 border-transparent rounded-xl focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all outline-none"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
