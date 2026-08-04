"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Leaf } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/20 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white relative z-10 hover:shadow-brand-500/10 transition-shadow duration-500">
        <div className="text-center">
          <div className="mx-auto bg-gradient-to-br from-brand-400 to-brand-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-brand-500/30 transform hover:scale-110 hover:rotate-[15deg] transition-all duration-500">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Tạo tài khoản mới
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-bold text-brand-600 hover:text-brand-700 transition-colors underline underline-offset-4">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">Họ và tên</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                placeholder="Họ và tên"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                placeholder="Địa chỉ Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                placeholder="Mật khẩu"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Xác nhận mật khẩu</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                placeholder="Xác nhận mật khẩu"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-slate-300 rounded-md cursor-pointer"
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-slate-700">
              Tôi đồng ý với các <Link href="#" className="text-brand-600 font-bold hover:underline">Điều khoản & Chính sách</Link>
            </label>
          </div>

          <div>
            <Button type="submit" size="lg" className="w-full rounded-2xl py-6 font-bold text-lg shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1" disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
