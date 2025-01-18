"use server";

import { removePlayerFromQueue } from "@utils/matchmaking/remove-player-from-queue";

export const declineMatchAction: FormAction = async function (
  prevState,
  formData
) {
  const { message } = await removePlayerFromQueue({ preserve_match: false });

  return {
    ...prevState,
    message
  };
};
