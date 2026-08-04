import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import mockProducts from "@/data/mockProducts.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let products: any[] = [];
    
    try {
      const whereClause: { category?: string; name?: { contains: string } } = {};
      if (category && category !== "all") {
        whereClause.category = category;
      }
      if (search) {
        whereClause.name = {
          contains: search,
        };
      }
      products = await prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.warn("Prisma error (likely Vercel SQLite issue), using fallback mock data");
    }

    // Fallback to mock data if no products in DB or DB failed
    if (!products || products.length === 0) {
      let filtered = mockProducts;
      if (category && category !== "all") {
        filtered = filtered.filter(p => p.category === category);
      }
      if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      }
      products = filtered;
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
