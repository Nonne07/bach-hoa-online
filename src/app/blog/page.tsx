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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Góc ẩm thực & Đời sống</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Cập nhật những tin tức mới nhất, mẹo vặt gia đình và kiến thức dinh dưỡng từ các chuyên gia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {POSTS.map((post) => (
          <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
            <Link href={`/blog/${post.id}`} className="block relative aspect-video bg-slate-100 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {post.category}
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</div>
                <div className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</div>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-brand-600 transition-colors">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-slate-600 line-clamp-3 mb-6 flex-1">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.id}`} className="inline-flex items-center font-medium text-brand-600 hover:text-brand-700 mt-auto">
                Đọc tiếp <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="lg" className="rounded-xl px-8">
          Tải thêm bài viết
        </Button>
      </div>
    </div>
  );
}
