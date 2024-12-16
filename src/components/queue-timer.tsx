"use client";

import { useEffect, useState } from "react";
import { formatDuration } from "@utils/matchmaking/format-duration";
import useGetPlayerDatum from "@utils/matchmaking/use-get-player-datum";

export default function QueueTimer() {
  const [timeElapsed, setTimeElapsed] = useState(formatDuration(0));

  const timeJoinedAt = useGetPlayerDatum({
    tableName: "queue",
    columnName: "joined_at",
    initialValue: null
  });

  useEffect(() => {
    if (timeJoinedAt) {
      const timeJoined = new Date(timeJoinedAt).getTime();

      const elapsedTimeInterval = setInterval(() => {
        const currentTime = new Date().getTime();

        const elapsedMilliseconds = currentTime - timeJoined;

        // Guard clause for negative time, which produces 59:59
        if (elapsedMilliseconds < 0) return;

        const elapsedTimeFormatted = formatDuration(elapsedMilliseconds);

        setTimeElapsed(elapsedTimeFormatted);
      }, 1000);

      return () => clearInterval(elapsedTimeInterval);
    }
  }, [timeJoinedAt]);

  return timeElapsed ? (
    <>
      <div>Searching...</div>
      <div>{timeElapsed}</div>
    </>
  ) : (
    <div>Joining queue...</div>
  );
}
