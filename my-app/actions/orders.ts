"use server";

import { db } from "@/drizzle/db";
import { and, count, desc, eq, ne, sql } from "drizzle-orm";
import {
  menuCategories,
  menuItems,
  orderItems,
  orders,
  user,
} from "@/drizzle/schema"; // Import your orders table
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getOrdersCount() {
  const result = await db.select({ count: count() }).from(orders);
  return result[0]?.count ?? 0;
}
export async function getPendingOrders() {
  const allOrders = await db.query.orders.findMany({
    where: eq(orders.status, "pending"),
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
    },
  });
  return allOrders;
}
export async function getPreparingOrders() {
  const allOrders = await db.query.orders.findMany({
    where: eq(orders.status, "preparing"),
  });
  return allOrders;
}
export async function getReadyOrders() {
  const allOrders = await db.query.orders.findMany({
    where: eq(orders.status, "ready"),
  });
  return allOrders;
}
type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "completed"
  | "cancelled";
export async function updateStatus(orderId: string, status: any) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (
    session?.user.role !== "kitchen" &&
    session?.user.role !== "admin" &&
    session?.user.role !== "driver"
  ) {
    throw new Error("You are not allowed");
  }
  const update = await db
    .update(orders)
    .set({ status: status })
    .where(eq(orders.id, orderId))
    .returning();
  return { success: true };
}
export async function bestSelling() {
  const bestSelling = await db
    .select({
      id: menuItems.id,
      name: menuItems.name,
      price: menuItems.price,
      image: menuItems.imageUrl,
      categoryId: menuItems.categoryId,
    })
    .from(menuItems)
    .innerJoin(orderItems, eq(menuItems.id, orderItems.menuItemId))
    .groupBy(menuItems.id)
    .orderBy(desc(sql`sum(${orderItems.quantity})`))
    .limit(10);

  return bestSelling;
}
export const orderTrack = async (orderId: string) => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      item: {
        with: {
          menuItem: true,
        },
      },
    },
  });
  return order;
};
export async function allUserOrders() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return [];
  }

  // Directly fetch orders for the user
  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, session.user.id),
    with: {
      item: {
        with: {
          menuItem: {
            columns: {
              quantity: true,
              price: true,
            },
          },
        },
      },
    },
  });

  return userOrders;
}
