"use server";

import { removePlayerFromQueue } from "@utils/matchmaking/remove-player-from-queue";

export const cancelQueueAction: FormAction = async function (
  prevState,
  formData
) {
  const { already_matched, message } = await removePlayerFromQueue({
    preserve_match: true
  });

  return {
    ...prevState,
    already_matched,
    message
  };
};
