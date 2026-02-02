import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, ProductStatus } from "@/lib/db";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user || !session.user.sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");
  const newStatus = searchParams.get("status");
  if (!productId || !newStatus) {
    return NextResponse.json({ error: "Product ID and status required" }, { status: 400 });
  }


  // Only allow valid status (case-insensitive)
  const allowedStatuses: ProductStatus[] = ["PUBLISHED", "DISABLED"];
  const normalizedStatus = newStatus.toUpperCase() as ProductStatus;
  if (!allowedStatuses.includes(normalizedStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Check if product belongs to seller
  const product = await db.product.findUnique({
    where: { id: productId },
    select: { sellerId: true },
  });
  if (!product || product.sellerId !== session.user.sellerId) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
  }

  await db.product.update({
    where: { id: productId },
    data: { status: normalizedStatus },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user || !session.user.sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");
  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  // Check if product belongs to seller
  const product = await db.product.findUnique({
    where: { id: productId },
    select: { sellerId: true },
  });
  if (!product || product.sellerId !== session.user.sellerId) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
  }

  await db.product.delete({ where: { id: productId } });
  return NextResponse.json({ success: true });
}
