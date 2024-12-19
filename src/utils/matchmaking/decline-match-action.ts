"use server";

import { removeMatchedPlayerFromQueue } from "@utils/matchmaking/remove-matched-player-from-queue";

export const declineMatchAction: FormAction = async function (
  prevState,
  formData
) {
  const { message } = await removeMatchedPlayerFromQueue();

  return {
    ...prevState,
    message
  };
};
