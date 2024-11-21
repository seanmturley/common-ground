"use server";

import { UUID } from "crypto";
import { addServerClient } from "@utils/supabase/server";

export const startMatchmaking: FormAction = async function (
  prevState,
  formData
) {
  const supabase = await addServerClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const id = user?.id as UUID;

  // Type-casting here for convenience
  // Ideally, the inputs should be validated
  const matchData = {
    format: formData.get("format") as string,
    match_type: formData.get("match_type") as string
  };

  const response = await fetch("/api/matchmaking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...matchData, id })
  });

  const data = await response.json();

  if (response.ok) {
    console.log("Searching for a match...");
    // Listen for Realtime updates or handle the response
  } else {
    console.error("Error starting matchmaking:", data.error);
  }

  return {
    ...prevState,
    ...matchData,
    buttonText: "Cancel",
    message: "Searching for an opponent..."
  };
};
