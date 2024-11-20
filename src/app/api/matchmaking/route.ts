import { type NextRequest, NextResponse } from "next/server";
import { isValidUuid } from "@utils/general/is-valid-uuid";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id || !isValidUuid(id)) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.SUPABASE_FUNCTIONS_URL}/matchmaking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        } as HeadersInit,
        body: JSON.stringify({ id })
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(
      { error: data.error || "Matchmaking failed" },
      { status: response.status }
    );
  } catch (error) {
    console.error("Error triggering Edge Function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
