import { db } from "@/drizzle/db";
import { reservations } from "@/drizzle/schema";
import { adminProtected } from "@/lib/adminProtected";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  await adminProtected();
  const allReservations = await db.query.reservations.findMany({
    with: {
      table: true,
    },
    orderBy: (reservations, { asc }) => [
      asc(reservations.reservationDate),
      asc(reservations.reservationTime),
    ],
  });
  return NextResponse.json(allReservations);
}
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const body = await req.json();

    const {
      name,
      phone,
      numberOfPeople,
      reservationTime,
      reservationDate,
      status,
      notes,
      table,
    } = body;

    // Validate required fields
    if (
      !name ||
      !phone ||
      !numberOfPeople ||
      !reservationTime ||
      !reservationDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Extract just the date part (YYYY-MM-DD) from the ISO string
    let formattedDate = null;
    if (reservationDate) {
      const dateObj = new Date(reservationDate);
      formattedDate = dateObj.toISOString().split("T")[0]; // Returns YYYY-MM-DD
    }

    // reservationTime should already be in HH:MM:SS format from your frontend
    // Make sure it has seconds
    let formattedTime = reservationTime;
    if (formattedTime && formattedTime.split(":").length === 2) {
      formattedTime = `${formattedTime}:00`; // Add seconds if missing
    }

    const newReservation = await db
      .insert(reservations)
      .values({
        userId: session?.user.id,
        name,
        phone,
        numberOfPeople: parseInt(numberOfPeople),
        reservationTime: formattedTime,
        reservationDate: formattedDate,
        status: status || "pending",
        table: table || "",
        notes: notes || "",
      })
      .returning();

    return NextResponse.json(
      { success: true, data: newReservation[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
