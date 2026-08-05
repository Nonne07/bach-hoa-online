"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import React from "react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
    >
      <LogOut className="w-5 h-5" /> Đăng xuất
    </button>
  );
}
