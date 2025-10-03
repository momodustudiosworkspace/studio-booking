import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "";
  const nextCursor = searchParams.get("next_cursor") || "";

  try {
    const result = await cloudinary.search
      .expression(`folder="${folder}"`) // 🔍 filter by folder
      .max_results(12)                  // 🔢 limit per request
      .next_cursor(nextCursor || undefined)
      .execute();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
