"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/20 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white relative z-10 hover:shadow-brand-500/10 transition-shadow duration-500">
        <div className="text-center">
          <div className="mx-auto bg-gradient-to-br from-brand-400 to-brand-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-brand-500/30 transform hover:scale-110 hover:rotate-[15deg] transition-all duration-500">
            <KeyRound className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Quên mật khẩu?
          </h2>
          <p className="text-base text-slate-600 font-medium">
            {submitted 
              ? "Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu qua email của bạn." 
              : "Nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu."}
          </p>
        </div>

        {!submitted ? (
          <form 
            className="mt-8 space-y-6" 
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="rounded-md shadow-sm">
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 sm:text-sm transition-all"
                placeholder="Địa chỉ Email"
              />
            </div>

            <div>
              <button type="submit" className="w-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1">
                Gửi yêu cầu
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <button 
              className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg py-4 rounded-2xl hover:border-brand-500 hover:text-brand-600 transition-all hover:-translate-y-1 shadow-sm"
              onClick={() => setSubmitted(false)}
            >
              Thử lại với email khác
            </button>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/login" className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors underline underline-offset-4">
            <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
