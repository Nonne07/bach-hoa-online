"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const THEMES = {
  default: { // Premium Forest Green (Organic, non-AI)
    50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80",
    500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d"
  },
  meat: { // Ruby Red
    50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171",
    500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d"
  },
  veggies: { // Emerald Green
    50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399",
    500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b"
  },
  fruits: { // Vibrant Orange
    50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c",
    500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12"
  },
  drinks: { // Ice Cyan
    50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee",
    500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63"
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    let theme = THEMES.default;
    
    // Determine the theme based on the URL path
    if (pathname.includes("/shop/meat")) theme = THEMES.meat;
    else if (pathname.includes("/shop/veggies")) theme = THEMES.veggies;
    else if (pathname.includes("/shop/fruits")) theme = THEMES.fruits;
    else if (pathname.includes("/shop/drinks")) theme = THEMES.drinks;

    const root = document.documentElement;
    Object.entries(theme).forEach(([shade, color]) => {
      root.style.setProperty(`--theme-brand-${shade}`, color);
    });
  }, [pathname]);

  return <>{children}</>;
}
