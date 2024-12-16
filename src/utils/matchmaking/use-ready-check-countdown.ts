"use client";

import { useEffect, useState } from "react";
import useGetPlayerDatum from "@utils/matchmaking/use-get-player-datum";

export default function useReadyCheckCountdown(readyCheckDuration: number) {
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
      }, 1000);

      return () => clearInterval(timeRemainingInterval);
    }
  }, [readyCheckDuration, timeMatchedAt]);

  return timeRemaining;
}
