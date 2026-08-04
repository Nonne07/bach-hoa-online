import React from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const POSTS = [
  {
    id: 1,
    title: "Cách bảo quản rau củ tươi lâu trong tủ lạnh",
    excerpt: "Nhiều bà nội trợ thường gặp tình trạng rau củ nhanh héo, ủng dù đã cất trong tủ lạnh. Bài viết này sẽ mách bạn bí quyết giữ rau củ tươi ngon cả tuần.",
    date: "01/08/2026",
    author: "Bếp trưởng",
    image: "/images/blog_veg_storage_1785742134550.png",
    category: "Mẹo vặt gia đình"
  },
  {
    id: 2,
    title: "Thực đơn dinh dưỡng cho trẻ phát triển chiều cao",
    excerpt: "Gợi ý những món ăn từ thực phẩm sạch, giàu canxi và vitamin D giúp bé yêu phát triển thể chất toàn diện.",
    date: "28/07/2026",
    author: "Chuyên gia dinh dưỡng",
    image: "/images/blog_kids_nutrition_1785742144494.png",
    category: "Sức khỏe"
  },
  {
    id: 3,
    title: "Phân biệt trái cây nội địa và trái cây nhập khẩu",
    excerpt: "Làm sao để chọn được trái cây chất lượng, an toàn và đúng nguồn gốc? Hãy cùng tìm hiểu qua các dấu hiệu nhận biết đơn giản sau.",
    date: "25/07/2026",
    author: "Ban Biên Tập",
    image: "/images/blog_fruit_compare_1785742153272.png",
    category: "Kiến thức thực phẩm"
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/50 text-brand-600 font-bold text-sm mb-6 border border-brand-200/50 backdrop-blur-md">
          <span>✨</span> Blog & Tin tức
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 mb-6 tracking-tight">Góc ẩm thực & Đời sống</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Cập nhật những tin tức mới nhất, mẹo vặt gia đình và kiến thức dinh dưỡng từ các chuyên gia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {POSTS.map((post) => (
          <article key={post.id} className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-white hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col">
            <Link href={`/blog/${post.id}`} className="block relative aspect-video bg-slate-100 overflow-hidden m-4 rounded-[2rem]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-600 text-xs font-black px-4 py-2 rounded-full shadow-lg z-10 uppercase tracking-wider">
                {post.category}
              </div>
            </Link>
            <div className="p-8 pt-4 flex flex-col flex-1">
              <div className="flex items-center gap-6 text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-500" /> {post.date}</div>
                <div className="flex items-center gap-2"><User className="w-4 h-4 text-brand-500" /> {post.author}</div>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 line-clamp-2 group-hover:text-brand-600 transition-colors leading-tight">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-slate-600 line-clamp-3 mb-8 flex-1 font-medium leading-relaxed">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.id}`} className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-slate-50 font-bold text-brand-600 group-hover:bg-brand-50 transition-colors mt-auto group/btn">
                Đọc tiếp <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-20 flex justify-center relative z-10">
        <button className="px-10 py-5 bg-white border-2 border-slate-200 rounded-full font-bold text-lg text-slate-700 hover:border-brand-500 hover:text-brand-600 hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1 transition-all duration-300">
          Tải thêm bài viết
        </button>
      </div>
    </div>
  );
}
