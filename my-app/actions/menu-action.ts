"use server";

import { db } from "@/drizzle/db";
import { menuItems } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export async function details(menuId: string) {
  const detail = await db.query.menuItems.findFirst({
    where: eq(menuItems.id, menuId),
    with: {
      category: true,
    },
  });
  return detail;
}
export async function relatedItems(categoryId: string) {
  const related = await db.query.menuItems.findMany({
    where: eq(menuItems.categoryId, categoryId), // Fixed: compare categoryId, not id
    with: {
      category: true,
    },
    limit: 4,
  });
  return related;
}
export async function updateItem(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    if (!id || !name || !price) {
      return { error: "Missing required fields" };
    }

    const updateData: any = { name, description, price };

    await db.update(menuItems).set(updateData).where(eq(menuItems.id, id));

    revalidatePath("/admin/menu");

    return { success: true };
  } catch (error) {
    console.error("Failed to update menu item:", error);
    return { error: "Failed to update menu item" };
  }
}
export async function deleteItem(itemId: string) {
  try {
    await db.delete(menuItems).where(eq(menuItems.id, itemId));

    revalidatePath("/admin/menu");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete menu item:", error);
    return { error: "Failed to delete menu item" };
  }
}
export async function toggleAvalibilty(itemId: string) {
  try {
    // First get the current item's availability status
    const currentItem = await db
      .select({ isAvaliable: menuItems.isAvaliable })
      .from(menuItems)
      .where(eq(menuItems.id, itemId))
      .limit(1);

    if (currentItem.length === 0) {
      return { error: "Menu item not found", success: false };
    }

    // Toggle the value
    await db
      .update(menuItems)
      .set({ isAvaliable: !currentItem[0].isAvaliable })
      .where(eq(menuItems.id, itemId));

    revalidatePath("/admin/menu");

    return { success: true };
  } catch (error) {
    console.error("Failed to update menu item:", error);
    return { error: "Failed to update menu item", success: false };
  }
}
