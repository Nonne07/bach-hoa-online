"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Leaf } from "lucide-react";
import { signIn } from "next-auth/react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const registered = searchParams.get("registered");
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl
      });

      if (res?.error) {
        setError("Email hoặc mật khẩu không chính xác");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {registered && (
        <div className="bg-brand-50 text-brand-600 p-3 rounded-xl text-sm text-center">
          Đăng ký thành công! Vui lòng đăng nhập.
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
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
              className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
              placeholder="Địa chỉ Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
              placeholder="Mật khẩu"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
              Ghi nhớ đăng nhập
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-brand-600 hover:text-brand-500">
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <div>
          <Button type="submit" size="lg" className="w-full rounded-xl shadow-lg shadow-brand-500/30" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default function LoginPage() {
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
            Đăng nhập
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="font-bold text-brand-600 hover:text-brand-700 transition-colors underline underline-offset-4">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-4 text-brand-500 font-medium">Đang tải...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
