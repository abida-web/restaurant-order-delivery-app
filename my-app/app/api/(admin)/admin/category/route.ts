import { db } from "@/drizzle/db";
import { menuCategories } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  const allOrders = await db.query.menuCategories.findMany();
  return NextResponse.json(allOrders);
}
export async function POST(req: NextRequest) {
  await adminProtected();
  const { name } = await req.json();
  const existing = await db.query.menuCategories.findFirst({
    where: eq(menuCategories.name, name),
  });
  if (!existing) {
    await db.insert(menuCategories).values({
      name,
    });
  }
  return NextResponse.json({ success: true }, { status: 201 });
}
