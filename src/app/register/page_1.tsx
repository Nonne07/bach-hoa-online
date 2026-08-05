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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto bg-brand-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm text-center">
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
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
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
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
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
              className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-slate-900">
              Tôi đồng ý với các <Link href="#" className="text-brand-600 hover:underline">Điều khoản & Chính sách</Link>
            </label>
          </div>

          <div>
            <Button type="submit" size="lg" className="w-full rounded-xl shadow-lg shadow-brand-500/30" disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
