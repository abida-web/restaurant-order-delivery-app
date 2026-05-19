import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await adminProtected();
  const { id } = await params;
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      item: {
        with: {
          menuItem: true,
        },
      },
      driver: true,
    },
  });
  return NextResponse.json(order);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { status } = await request.json();
  const updateSta = await db
    .update(orders)
    .set({ status: status })
    .where(eq(orders.id, id))
    .returning();
  return NextResponse.json({ success: true }, { status: 200 });
}
