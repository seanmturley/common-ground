"use client";

import useGetPlayerStatus from "@utils/matchmaking/use-get-player-status";
import JoinQueueForm from "@components/join-queue-form";

export default function Play() {
  const playerStatus = useGetPlayerStatus();
  console.log(`playerStatus: ${playerStatus}`);

  return <JoinQueueForm />;
}
