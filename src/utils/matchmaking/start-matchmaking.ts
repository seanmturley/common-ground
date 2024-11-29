"use server";

import { addPlayerToMatchmaking } from "./add-player-to-matchmaking";

export const startMatchmaking: FormAction = async function (
  prevState,
  formData
) {
  // Type-casting here for convenience
  // Ideally, the inputs should be validated
  const matchData: MatchData = {
    format: formData.get("format") as Format,
    match_type: formData.get("match_type") as MatchType
  };

  const { message } = await addPlayerToMatchmaking(matchData);

  return {
    ...prevState,
    ...matchData,
    buttonText: "Cancel",
    message
  };
};
