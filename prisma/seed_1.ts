import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CATEGORIES = ["Thịt cá", "Rau củ", "Trái cây", "Đồ uống"]

const PRODUCTS = [
  { id: "p1", name: "Thịt Bò Mỹ Nhập Khẩu Thượng Hạng (500g)", price: 250000, originalPrice: 300000, image: "/images/premium_beef_1785741941389.png", category: "Thịt cá", description: "Thịt bò Mỹ nhập khẩu thượng hạng cắt lát mỏng mềm ngọt, hoàn hảo cho món lẩu và nướng." },
  { id: "p2", name: "Cá Hồi Na Uy Tươi Ngon (300g)", price: 180000, originalPrice: 200000, image: "/images/fresh_salmon_1785741952594.png", category: "Thịt cá", description: "Cá hồi tươi nhập khẩu từ Na Uy giàu dinh dưỡng Omega 3." },
  { id: "p3", name: "Cải Chíp Hữu Cơ Farm Chuẩn Sạch (500g)", price: 25000, originalPrice: 30000, image: "/images/fresh_organic_tomatoes_1785741816028.png", category: "Rau củ", description: "Rau cải chíp tươi ngon đạt tiêu chuẩn hữu cơ VietGAP." },
  { id: "p4", name: "Nước Ép Cam Nguyên Chất Trái Cây (1L)", price: 65000, originalPrice: 80000, image: "/images/blog_fruit_compare_1785742153272.png", category: "Đồ uống", description: "Nước ép cam mọng nước thơm ngon bổ dưỡng." },
  { id: "p5", name: "Thịt Heo Sạch 3F (500g)", price: 85000, originalPrice: 100000, image: "/images/premium_beef_1785741941389.png", category: "Thịt cá", description: "Thịt heo sạch 3F đảm bảo nguồn gốc an toàn tươi ngon." },
  { id: "p6", name: "Cà chua Cherry Hữu Cơ (300g)", price: 45000, originalPrice: 50000, image: "/images/fresh_organic_tomatoes_1785741816028.png", category: "Rau củ", description: "Cà chua bi ngọt thanh mọng nước giàu vitamin C." },
  { id: "p7", name: "Trà Xanh Đóng Chai (500ml)", price: 15000, originalPrice: 20000, image: "/images/premium_vietnamese_coffee_1785741831980.png", category: "Đồ uống", description: "Trà xanh giải khát thanh nhiệt sảng khoái." },
  { id: "p8", name: "Nho Mẫu Đơn Hàn Quốc (500g)", price: 350000, originalPrice: 400000, image: "/images/blog_fruit_compare_1785742153272.png", category: "Trái cây", description: "Nho mẫu đơn Shine Muscat ngọt đậm giòn ngon thượng hạng." },
];

async function main() {
  console.log("Start seeding...");

  await prisma.product.deleteMany({});
  
  for (const p of PRODUCTS) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
