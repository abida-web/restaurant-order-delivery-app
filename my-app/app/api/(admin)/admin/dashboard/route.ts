import { db } from "@/drizzle/db";
import { orders, user } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { and, count, desc, eq, gte, lt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  await adminProtected();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tommarow = new Date(today);
  tommarow.setDate(tommarow.getDate() + 1);
  const last = new Date(today);
  last.setDate(last.getDate() - 6);
  const report = await db
    .select({
      date: sql<string>`dates.day`,
      orderCount: count(orders.id), // Specifically count order IDs to get 0 for empty days
    })
    .from(
      sql`(SELECT generate_series(${last}, ${today}, '1 day'::interval)::date AS day) AS dates`,
    )
    .leftJoin(orders, sql`CAST(${orders.createdAt} AS date) = dates.day`)
    .groupBy(sql`dates.day`)
    .orderBy(sql`dates.day ASC`);

  const todayAllOrders = await db
    .select()
    .from(orders)
    .where(and(gte(orders.createdAt, today), lt(orders.createdAt, tommarow)));
  const todayRevenue = todayAllOrders.reduce((sum, item) => {
    return sum + Number(item.totalAmount);
  }, 0);
  const pendingOrders = await db.query.orders.findMany({
    where: eq(orders.status, "pending"),
  });
  const drivers = await db.query.user.findMany({
    where: eq(user.role, "driver"),
  });
  const tenLatestOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(10);
  const order = await db.query.orders.findMany({});
  const deliveries = order.filter((o) => o.type === "delivery").length;
  const dineIn = order.filter((o) => o.type === "dine-in").length;
  const takeAway = order.filter((o) => o.type === "takeaway").length;
  const total = deliveries + dineIn + takeAway;
  const dlvPrecentage = (deliveries / total) * 100;
  const DinePrecentage = (dineIn / total) * 100;
  const takAwayPrecentage = (takeAway / total) * 100;
  return NextResponse.json({
    drivers: drivers.length,
    todayOrders: todayAllOrders.length,
    orders: todayAllOrders,
    latestOrders: tenLatestOrders,
    todayRevenue: todayRevenue,
    pendingOrders: pendingOrders.length,
    report: report,
    deliveries: dlvPrecentage,
    takeAwayPrecentage: takAwayPrecentage,
    DineInPrecentage: DinePrecentage,
  });
}
