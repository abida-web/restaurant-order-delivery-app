import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await adminProtected();

    const allDrivers = await db.query.user.findMany({
      where: eq(user.role, "driver"),
      with: {
        driverOrders: true,
      },
      orderBy: (user, { desc }) => [desc(user.createdAt)], // Optional: order by newest first
    });

    return NextResponse.json({
      success: true,
      data: allDrivers,
      count: allDrivers.length,
    });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch drivers",
      },
      { status: 500 },
    );
  }
}
