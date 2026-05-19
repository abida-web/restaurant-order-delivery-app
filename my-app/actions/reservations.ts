"use server";
import { db } from "@/drizzle/db";
import { reservations } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function assignTable(reservationId: string, tableId: string) {
  await adminProtected();
  const assign = await db
    .update(reservations)
    .set({ tableId: tableId })
    .where(eq(reservations.id, reservationId))
    .returning();

  revalidatePath("/admin/tables");

  return { success: true };
}

export async function updateReservationStatuse(
  reservationId: string,
  status: string,
) {
  const update = await db
    .update(reservations)
    .set({ status: status })
    .where(eq(reservations.id, reservationId))
    .returning();
  return { success: true };
}
export async function allReservations() {
  const session = await auth.api.getSession({ headers: await headers() });
  const allReservations = await db.query.reservations.findMany({
    where: eq(reservations.userId, session?.user.id),
  });
  return allReservations;
}
