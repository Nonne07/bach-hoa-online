import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/providers/Providers";
import { GlobalBackground } from "@/components/layout/GlobalBackground";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bách Hóa Online - Thực phẩm tươi sạch mỗi ngày",
  description: "Bách Hóa Online - Ứng dụng mua sắm thực phẩm trực tuyến với giá tốt nhất, giao hàng nhanh chóng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-800 bg-transparent relative">
        <GlobalBackground />
        <Providers>
          <Navbar />
          <main className="flex-grow flex flex-col relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
