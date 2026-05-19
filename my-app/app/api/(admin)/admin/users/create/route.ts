"use server";

import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: string;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || session.user.role !== "owner") {
      return { error: "Unauthorized" };
    }

    const { email, password, name, phone, role } = data;

    if (!["staff", "driver"].includes(role)) {
      return { error: "Role must be either staff or driver" };
    }

    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email));
    if (existingUser.length > 0) {
      return { error: "User already exists" };
    }

    // Save current session cookie
    const cookieStore = await cookies();
    const currentSession = cookieStore.get("better-auth.session-token")?.value;

    // Create user using BetterAuth (this will create both user and account)
    const { user: newUser } = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    // Restore original session cookie
    if (currentSession) {
      cookieStore.set("better-auth.session-token", currentSession);
    }

    // Update role and phone
    await db.update(user).set({ role, phone }).where(eq(user.id, newUser.id));

    console.log(`✅ Created ${role}: ${email}`);

    return { success: true };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { error: error.message || "Failed to create user" };
  }
}
