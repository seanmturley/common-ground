import "server-only";

import type { UUID } from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@utils/auth/get-current-user";
import {
  isValidFormat,
  isValidMatchType,
  isValidUuid
} from "@utils/matchmaking/data-validation";
import { addServerClient } from "@utils/supabase/server";

export async function addPlayerToMatchmaking({
  format,
  match_type
}: MatchData): Promise<{ message: string }> {
  const supabase = await addServerClient();
  const { isAuthenticated, user } = await getCurrentUser(supabase);

  if (!isAuthenticated || !user) {
    redirect("/login");
  }

  if (
    !isValidUuid(user.id as UUID) ||
    !isValidFormat(format) ||
    !isValidMatchType(match_type)
  ) {
    return { message: "Invalid input data." };
  }

  const { error } = await supabase
    .from("matchmaking_queue")
    .insert({ player_id: user.id, format, match_type });

  if (error) {
    console.log(error.message);
    return { message: "Error joining the matchmaking queue." };
  }

  return { message: "Searching for an opponent..." };
}
