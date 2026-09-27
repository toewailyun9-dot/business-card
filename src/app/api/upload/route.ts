import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Please upload an image file (JPEG, PNG, WebP, GIF, SVG)" },
        { status: 400 }
      );
    }

    // Limit to 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "Image file size must be under 5MB" },
        { status: 400 }
      );
    }

    // Save file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Try saving to disk (works on local dev & VPS)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      const ext = path.extname(file.name) || ".jpg";
      const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueFileName = `${Date.now()}-${baseName}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFileName);

      await fs.writeFile(filePath, buffer);
      const publicUrl = `/uploads/${uniqueFileName}`;
      return NextResponse.json({ success: true, url: publicUrl });
    } catch (fsErr) {
      // In Serverless environments (like Vercel) where the filesystem is read-only (EROFS),
      // seamlessly fallback to a Data URL so it is stored directly in the database.
      console.warn("Filesystem read-only or unavailable. Using Data URL fallback:", fsErr);
      const mime = file.type || "image/jpeg";
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${mime};base64,${base64}`;
      return NextResponse.json({ success: true, url: dataUrl });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Failed to upload image file" }, { status: 500 });
  }
}
