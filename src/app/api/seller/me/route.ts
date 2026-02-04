import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getSellerById, updateSeller } from "@/lib/sellers";

export async function GET() {
  const session = await auth();

  if (!session?.user?.sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const seller = await getSellerById(session.user.sellerId);

  return NextResponse.json(seller);
}

export async function PUT(req: Request) {
  const session = await auth();

  if (!session?.user?.sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedSeller = await updateSeller(
    session.user.sellerId,
    body
  );

  return NextResponse.json(updatedSeller);
}
