import baseUrl from "@/config/baseUrl";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<unknown>> {
  try {
    const body = await req.json();

    const res = await fetch(`${baseUrl}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    console.log("data from route: ", data);

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Registration failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    console.log("Server error: ", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
