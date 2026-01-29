import type { Product } from "@/types/product";

export type SellerProduct = Product & {
  status: "published" | "draft" | "disabled";
  stock: number;
};

let products: SellerProduct[] = [
  {
    id: 1,
    title: "Handwoven Basket",
    price: 32,
    image: "https://picsum.photos/seed/vase/400/400",
    seller: "You",
    rating: 4.5,
    reviewCount: 12,
    createdAt: new Date(),
    status: "published",
    stock: 5,
  },
  {
    id: 2,
    title: "Handwoven Carpet",
    price: 12,
    image: "https://picsum.photos/seed/macrame/400/400",
    seller: "You",
    rating: 4.5,
    reviewCount: 12,
    createdAt: new Date(),
    status: "draft",
    stock: 10,
  },
  {
    id: 3,
    title: "Handwoven Hat",
    price: 22,
    image: "https://picsum.photos/seed/journal/400/400",
    seller: "You",
    rating: 4.0,
    reviewCount: 6,
    createdAt: new Date(),
    status: "disabled",
    stock: 0,
  },
  {
    id: 4,
    title: "Handwoven Gloves",
    price: 5,
    image: "https://picsum.photos/seed/candles/400/400",
    seller: "You",
    rating: 3.5,
    reviewCount: 35,
    createdAt: new Date(),
    status: "published",
    stock: 50,
  },
  {
    id: 5,
    title: "Handwoven Shirts",
    price: 5,
    image: "https://picsum.photos/seed/bowl/400/400",
    seller: "You",
    rating: 3.5,
    reviewCount: 35,
    createdAt: new Date(),
    status: "published",
    stock: 100,
  },
  {
    id: 6,
    title: "Handwoven Socks",
    price: 5.84,
    image: "https://picsum.photos/seed/earrings/400/400",
    seller: "You",
    rating: 1.5,
    reviewCount: 35,
    createdAt: new Date(),
    status: "disabled",
    stock: 5,
  },
  {
    id: 7,
    title: "Handwoven Socks",
    price: 5.84,
    image: "https://picsum.photos/seed/earrings/400/400",
    seller: "You",
    rating: 1.5,
    reviewCount: 35,
    createdAt: new Date(),
    status: "published",
    stock: 3000,
  },
];

export function getProducts(): SellerProduct[] {
  return products.map((p) => ({ ...p }));
}

export function getProductById(id: number): SellerProduct | undefined {
  const p = products.find((x) => x.id === id);
  return p ? { ...p } : undefined;
}

export function updateProduct(id: number, data: Partial<SellerProduct>): boolean {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products[idx] = { ...products[idx], ...data };
  return true;
}

export function addProduct(data: Omit<SellerProduct, 'id' | 'createdAt'> & { id?: number }) {
  const id = data.id ?? Math.max(0, ...products.map((p) => p.id)) + 1;
  const newProduct: SellerProduct = {
    ...data,
    id,
    createdAt: new Date(),
  } as SellerProduct;
  products.push(newProduct);
  return { ...newProduct };
}
