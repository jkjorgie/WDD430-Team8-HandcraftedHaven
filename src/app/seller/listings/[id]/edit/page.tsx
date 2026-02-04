import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import EditListingForm from "./ui";
import { notFound } from "next/navigation";

type Props = {
  params: { id?: string } | Promise<{ id?: string }>;
};

export default async function EditListingPage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.sellerId) {
    notFound();
  }

  const resolvedParams = await Promise.resolve(params);
  const productId = resolvedParams?.id;

  if (!productId) {
    notFound();
  }

  const product = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product || product.sellerId !== session.user.sellerId) {
    notFound();
  }

  // Convert Decimal fields to number for client component
  const safeProduct = {
    ...product,
    price: product.price ? Number(product.price) : 0,
  };
  return <EditListingForm product={safeProduct} />;
}
