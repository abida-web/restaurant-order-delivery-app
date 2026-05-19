// app/actions/user.ts
"use server";
import { adminProtected } from "@/lib/adminProtected";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Make sure this is added

export async function updateUser(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const role = formData.get("role");
  const phone = formData.get("phone");
  const status = formData.get("status");

  try {
    const updateUser = await auth.api.adminUpdateUser({
      body: {
        userId: id as string,
        data: {
          name: name as string,
          role: role as string,
          phone: phone as string,
          status: status as string,
        },
      },
      headers: await headers(),
    });

    return { success: true, data: updateUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }
}
