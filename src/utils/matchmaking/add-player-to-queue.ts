"use server";

import type { UUID } from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@utils/auth/get-current-user";
import {
  // isValidFormat,
  // isValidMatchType,
  isValidUuid
} from "@utils/matchmaking/data-validation";
import { addServerClient } from "@utils/supabase/server";

export const addPlayerToQueue: FormAction = async function (
  prevState,
  formData
) {
  const supabase = await addServerClient();
  const { isAuthenticated, user } = await getCurrentUser(supabase);

  if (!isAuthenticated) {
    redirect("/login");
  }

  const player_id = user?.id as UUID;
  // const format = formData.get("format") as Format;
  // const match_type = formData.get("match_type") as MatchType;

  if (
    !isValidUuid(player_id) // ||
    // !isValidFormat(format) ||
    // !isValidMatchType(match_type)
  ) {
    return { ...prevState, message: "Invalid input data." };
  }

  const { error } = await supabase.rpc("add_player_to_queue", {
    current_player_id: player_id
    // selected_format: format,
    // selected_match_type: match_type
  });

  if (error) {
    console.log(`Error: ${error.message}`);
    return {
      ...prevState,
      message: "Error adding player to the matchmaking queue."
    };
  }

  return { ...prevState };
};
