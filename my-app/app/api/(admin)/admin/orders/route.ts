import { db } from "@/drizzle/db";
import { orderItems, orders, orderStatusHistory } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = await new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  await adminProtected();
  const allOrders = await db.query.orders.findMany({
    with: {
      item: {
        with: {
          menuItem: {
            columns: {
              name: true,
            },
          },
        },
      },
      driver: true,
    },
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    limit,
    offset,
  });
  return NextResponse.json(allOrders);
}
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    const { customerName, phone, address, type, items, total } = body;

    // Validate required fields
    if (!customerName || !type || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: customerName, type, or items" },
        { status: 400 },
      );
    }

    const calculatedTotal =
      total ||
      items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0,
      );

    const [order] = await db
      .insert(orders)
      .values({
        userId: session?.user.id,
        customerName: customerName,
        phone: phone,
        address: address,
        type: type,
        status: "pending",
        totalAmount: calculatedTotal,
      })
      .returning();

    // Insert order status history
    await db.insert(orderStatusHistory).values({
      orderId: order.id,
      status: "pending",
      changedBy: session?.user.id,
    });

    // Insert order items
    for (let item of items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        id: order.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Server error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
