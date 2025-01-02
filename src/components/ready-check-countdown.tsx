"use client";

import { useEffect, useState } from "react";
import { formatDuration } from "@utils/matchmaking/format-duration";
import useGetPlayerDatum from "@utils/matchmaking/use-get-player-datum";
import { removeMatchedPlayerFromQueue } from "@utils/matchmaking/remove-matched-player-from-queue";

const readyCheckDuration = 30 * 1000;

export default function ReadyCheckCountdown() {
  const [timeRemaining, setTimeRemaining] = useState(readyCheckDuration);

  const timeMatchedAt = useGetPlayerDatum({
    tableName: "queue",
    columnName: "matched_at",
    initialValue: null
  });

  useEffect(() => {
    if (timeMatchedAt) {
      const timeMatched = new Date(timeMatchedAt).getTime();

      const timeRemainingInterval = setInterval(() => {
        const currentTime = new Date().getTime();

        const remainingMilliseconds =
          timeMatched + readyCheckDuration - currentTime;

        setTimeRemaining(remainingMilliseconds);

        if (remainingMilliseconds < 0) {
          (async () => {
            await removeMatchedPlayerFromQueue();
          })();
        }
      }, 1000);

      return () => clearInterval(timeRemainingInterval);
    }
  }, [timeMatchedAt]);

  return timeRemaining > 0 ? (
    <div>{formatDuration(timeRemaining)}</div>
  ) : (
    <div>Timed out!</div>
  );
}
