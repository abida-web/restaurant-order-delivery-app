import { db } from "@/drizzle/db";
import { menuItems } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export async function GET() {
  await adminProtected();
  const items = await db.query.menuItems.findMany({
    with: {
      category: true,
    },
  });
  return NextResponse.json(items);
}
export async function POST(req: Request) {
  await adminProtected();
  const { name, description, price, isAvaliable, categoryId, imageUrl } =
    await req.json();
  const newMenuItem = await db.insert(menuItems).values({
    name,
    description,
    price,
    isAvaliable: isAvaliable,
    categoryId,
    imageUrl,
  });
  return NextResponse.json({ success: true }, { status: 201 });
}
