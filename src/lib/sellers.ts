import { db } from "./db";

export async function getSellerById(id: string) {
  return db.seller.findUnique({
    where: { id },
  });
}

export async function updateSeller(id: string, data: {
  name: string;
  bio: string;
  location: string;
}) {
  return db.seller.update({
    where: { id },
    data,
  });
}
