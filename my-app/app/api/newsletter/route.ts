import { db } from "@/drizzle/db";
import { newsLetter } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const newsLet = await db
    .insert(newsLetter)
    .values({
      email: email,
    })
    .returning();
  return NextResponse.json({ success: true }, { status: 201 });
}
