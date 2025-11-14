import { NextResponse } from "next/server";

// Backend URL – replace with your deployment later
// For now, localhost for testing, or leave as ENV variable
const BACKEND_URL =
  process.env.RASTERA_BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  try {
    const res = await fetch(`${BACKEND_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", res.status, text);
      return NextResponse.json(
        { error: "Backend error", status: res.status },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error calling Rastera GeoAI backend:", err);
    return NextResponse.json(
      { error: "Failed to reach Rastera backend" },
      { status: 500 }
    );
  }
}
