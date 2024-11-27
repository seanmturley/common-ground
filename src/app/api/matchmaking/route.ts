import { type NextRequest, NextResponse } from "next/server";
import {
  // isValidFormat,
  // isValidMatchType,
  isValidUuid
} from "@utils/matchmaking/data-validation";
import { addServerClient } from "@utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { id /* , format, match_type */ } = await request.json();

    if (
      !isValidUuid(id) // ||
      // !isValidFormat(format) ||
      // !isValidMatchType(match_type)
    ) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const supabase = await addServerClient();

    const { data, error } = await supabase
      .from("matchmaking_queue")
      .insert({ player_id: id /* , format, match_type */ });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Joining matchmaking queue failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error joining the matchmaking queue:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
