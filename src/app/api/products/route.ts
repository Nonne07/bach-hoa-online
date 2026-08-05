import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import mockProducts from "@/data/mockProducts.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let products: any[] = [];
    
    const whereClause: { category?: string; name?: { contains: string, mode?: "insensitive" } } = {};
    if (category && category !== "all") {
      whereClause.category = category;
    }
    if (search) {
      whereClause.name = {
        contains: search,
        mode: "insensitive" // PostgreSQL supports insensitive search
      };
    }
    products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
