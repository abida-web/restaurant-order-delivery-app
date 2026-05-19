import { db } from "@/drizzle/db";
import { menuItems } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  let query;
  if (categoryId) {
    query = await db.query.menuItems.findMany({
      where: eq(menuItems.categoryId, categoryId),
      with: {
        category: true,
      },
    });
  } else {
    query = await db.query.menuItems.findMany({
      with: {
        category: true,
      },
    });
  }

  return NextResponse.json(query);
}
