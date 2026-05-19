import { db } from "@/drizzle/db";
import { menuCategories } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await adminProtected();
  const { id } = await params;
  const { name } = await request.json();

  const updated = await db
    .update(menuCategories)
    .set({ name: name })
    .where(eq(menuCategories.id, id))
    .returning();

  // Check if any rows were actually updated
  if (updated.length === 0) {
    return NextResponse.json(
      { success: false, error: "Category not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { success: true, data: updated[0] },
    { status: 200 },
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await adminProtected();
  const { id } = await params;

  const deleted = await db
    .delete(menuCategories)
    .where(eq(menuCategories.id, id))
    .returning(); // Add returning() to see what was deleted

  // Check if any rows were actually deleted
  if (deleted.length === 0) {
    return NextResponse.json(
      { success: false, error: "Category not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { success: true, data: deleted[0] },
    { status: 200 },
  );
}
