"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group";
    
    const variants = {
      primary: "bg-brand-500 text-white hover:bg-brand-400 focus:ring-brand-500 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/40",
      secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100 focus:ring-brand-500 border border-brand-100",
      outline: "border-2 border-brand-500/20 text-brand-600 hover:border-brand-500 hover:bg-brand-50 focus:ring-brand-500",
      ghost: "text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-500",
    };
    
    const sizes = {
      sm: "h-9 px-5 text-sm",
      md: "h-11 px-7 text-base tracking-wide",
      lg: "h-14 px-10 text-lg tracking-wide",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children as React.ReactNode}</span>
        {variant === 'primary' && (
           <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
