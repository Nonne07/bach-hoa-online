"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="w-8 h-8 text-brand-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Quên mật khẩu?
          </h2>
          <p className="text-sm text-slate-600">
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
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Địa chỉ Email"
              />
            </div>

            <div>
              <Button type="submit" size="lg" className="w-full rounded-xl shadow-lg shadow-brand-500/30">
                Gửi yêu cầu
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full rounded-xl"
              onClick={() => setSubmitted(false)}
            >
              Thử lại với email khác
            </Button>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-500">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
