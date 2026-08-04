import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import mockProducts from "@/data/mockProducts.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let product: any = null;

    try {
      product = await prisma.product.findUnique({
        where: { id },
      });
    } catch (e) {
      console.warn("Prisma error (likely Vercel SQLite issue), using fallback mock data");
    }

    if (!product) {
      product = mockProducts.find(p => p.id === id);
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
