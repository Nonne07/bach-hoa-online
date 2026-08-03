import mockProducts from '../data/mockProducts.json';
import mockCategories from '../data/mockCategories.json';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export const api = {
  getProducts: async (search?: string, category?: string): Promise<Product[]> => {
    let url = "/api/products";
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    // In a server component, this might need absolute URL, but for client components or standard usage:
    // If running server side in production, make sure to pass absolute URL or fetch directly from prisma.
    try {
      const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}${url}`, { cache: "no-store" });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });
      if (!res.ok) return undefined;
      return await res.json();
    } catch {
      return undefined;
    }
  },

  getProductsByCategory: async (categoryName: string): Promise<Product[]> => {
    return api.getProducts(undefined, categoryName);
  },

  getCategories: async (): Promise<Category[]> => {
    // For now, return static categories as they are mostly UI constants
    return mockCategories;
  }
};
