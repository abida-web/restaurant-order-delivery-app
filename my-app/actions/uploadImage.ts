// app/actions/uploadImage.ts
"use server";

const IMGBB_API_KEY = "c9668feeda70f40e354b4e3ae6258cf8";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    return { error: "No file provided" };
  }

  // Validate file type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Only JPEG, PNG, WEBP, and GIF are allowed." };
  }

  // Validate file size (max 16MB)
  if (file.size > 16 * 1024 * 1024) {
    return { error: "File too large. Maximum size is 16MB." };
  }

  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    // Upload to ImgBB
    const uploadFormData = new FormData();
    uploadFormData.append("image", base64);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: uploadFormData,
      },
    );

    const result = await response.json();

    if (!result.success) {
      return { error: "Upload failed" };
    }

    // Return the direct image URL
    return { success: true, url: result.data.url };
  } catch (error) {
    return { error: "Failed to upload image" };
  }
}
