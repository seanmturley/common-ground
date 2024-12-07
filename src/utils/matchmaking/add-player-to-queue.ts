import "server-only";

import type { UUID } from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@utils/auth/get-current-user";
import {
  // isValidFormat,
  // isValidMatchType,
  isValidUuid
} from "@utils/matchmaking/data-validation";
import { addServerClient } from "@utils/supabase/server";

export const addPlayerToQueue = async function ({
  format,
  match_type
}: MatchData): Promise<{ message: string; success: boolean }> {
  const supabase = await addServerClient();
  const { isAuthenticated, user } = await getCurrentUser(supabase);

  if (!isAuthenticated) {
    redirect("/login");
  }

  const player_id = user?.id as UUID;

  if (
    !isValidUuid(player_id) // ||
    // !isValidFormat(format) ||
    // !isValidMatchType(match_type)
  ) {
    return { message: "Invalid input data.", success: false };
  }

  const { error } = await supabase.rpc("add_player_to_queue", {
    current_player_id: player_id
    // selected_format: format,
    // selected_match_type: match_type
  });

  if (error) {
    console.log(`Error: ${error.message}`);
    return { message: "Error joining the matchmaking queue.", success: false };
  }

  return { message: "Searching for an opponent...", success: true };
};
