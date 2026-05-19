"use server";

import { auth } from "@/lib/auth";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import { orders, user } from "@/drizzle/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateDriverStatus(driverId: string, status: string) {
  await db
    .update(user)
    .set({
      status: status,
    })
    .where(eq(user.id, driverId));
  revalidatePath("/admin/drivers");
  return { success: true };
}
export async function driverDetails(driverId: string) {
  const details = await db.query.user.findFirst({
    where: and(eq(user.id, driverId)),
    with: {
      driverOrders: true,
    },
  });
  return details;
}
