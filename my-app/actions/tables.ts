"use server";
import { db } from "@/drizzle/db";
import { reservations, tables } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTable(tableForm: any) {
  await adminProtected();
  const newTable = await db
    .insert(tables)
    .values({
      tableNumber: tableForm.tableNumber,
      capacity: tableForm.capacity,
      location: tableForm.location,
      status: tableForm.status,
    })
    .returning();
  return { success: true };
}
export async function allTables() {
  const allTables = await db.query.tables.findMany({
    with: {
      reservations: true,
    },
  });
  return allTables;
}
export async function editTable(formData: FormData) {
  const id = formData.get("id") as string;
  const tableNumber = formData.get("tableNumber") as string;
  const capacity = formData.get("capacity") as string;
  const location = formData.get("location") as string;
  if (!id || !tableNumber || !capacity || !location) {
    return { error: "Missing required fields" };
  }
  const updateData: any = { tableNumber, capacity, location };
  await db.update(tables).set(updateData).where(eq(tables.id, id)).returning();

  revalidatePath("/admin/tables");

  return { success: true };
}
