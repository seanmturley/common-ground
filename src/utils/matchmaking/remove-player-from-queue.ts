"use server";

import type { UUID } from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@utils/auth/get-current-user";
import { isValidUuid } from "@utils/matchmaking/data-validation";
import { addServerClient } from "@utils/supabase/server";

export const removePlayerFromQueue = async function ({
  preserve_match
}: {
  preserve_match: boolean;
}) {
  const supabase = await addServerClient();
  const { isAuthenticated, user } = await getCurrentUser(supabase);

  if (!isAuthenticated) {
    redirect("/login");
  }

  const current_player_id = user?.id as UUID;

  if (!isValidUuid(current_player_id)) {
    return { message: "Invalid player ID." };
  }

  const { data, error } = await supabase
    .rpc("remove_player_from_queue", {
      current_player_id,
      preserve_match
    })
    .single();

  if (error) {
    console.error(`Error removing player from queue: ${error.message}`);
    return {
      message: "Error removing player from the matchmaking queue."
    };
  }

  const already_matched: Database["public"]["Functions"]["remove_player_from_queue"]["Returns"][number]["already_matched"] =
    data.already_matched;

  return {
    already_matched,
    message:
      preserve_match && already_matched
        ? "Already matched with an opponent."
        : ""
  };
};
