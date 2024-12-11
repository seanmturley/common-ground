"use server";

import type { UUID } from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@utils/auth/get-current-user";
import { isValidUuid } from "@utils/matchmaking/data-validation";
import { addServerClient } from "@utils/supabase/server";

export const removePlayerFromQueue: FormAction = async function (
  prevState,
  formData
) {
  const supabase = await addServerClient();
  const { isAuthenticated, user } = await getCurrentUser(supabase);

  if (!isAuthenticated) {
    redirect("/login");
  }

  const player_id = user?.id as UUID;

  if (!isValidUuid(player_id)) {
    return { ...prevState, message: "Invalid player ID." };
  }

  const { data, error } = await supabase
    .rpc("remove_player_from_queue", {
      current_player_id: player_id
    })
    .single();

  if (error) {
    console.log(`Error removing player from queue: ${error.message}`);
    return {
      ...prevState,
      message: "Error removing player from the matchmaking queue."
    };
  }

  const already_matched = data.already_matched;

  return {
    ...prevState,
    already_matched,
    message: already_matched ? "Already matched with an opponent." : ""
  };
};
