"use server";

import type { UUID } from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@utils/auth/get-current-user";
import { isValidUuid } from "@utils/matchmaking/data-validation";
import { addServerClient } from "@utils/supabase/server";

export const declineMatchAction: FormAction = async function (
  prevState,
  formData
) {
  const supabase = await addServerClient();
  const { isAuthenticated, user } = await getCurrentUser(supabase);

  if (!isAuthenticated) {
    redirect("/login");
  }

  const current_player_id = user?.id as UUID;

  if (!isValidUuid(current_player_id)) {
    return {
      ...prevState,
      message: "Invalid player ID."
    };
  }

  const { error } = await supabase
    .rpc("decline_match", {
      current_player_id
    })
    .single();

  if (error) {
    console.error(`Error declining the match: ${error.message}`);
    return {
      ...prevState,
      message: "Error declining the match."
    };
  }

  return {
    ...prevState
  };
};
