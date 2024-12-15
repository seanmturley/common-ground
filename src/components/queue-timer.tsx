"use client";

import { useEffect, useState } from "react";
import { useGetTimeJoinedQueue } from "@utils/matchmaking/use-get-time-joined-queue";
import { formatDuration } from "@utils/matchmaking/format-duration";

export default function QueueTimer() {
  const [timeElapsed, setTimeElapsed] = useState("");

  const timeJoinedQueue = useGetTimeJoinedQueue();

  useEffect(() => {
    if (timeJoinedQueue) {
      const elapsedTimeInterval = setInterval(() => {
        const currentTime = new Date().getTime();

        const elapsedMilliseconds = currentTime - timeJoinedQueue;

        // Guard clause for negative time, which produces 59:59
        if (elapsedMilliseconds < 0) return;

        const elapsedTimeFormatted = formatDuration(elapsedMilliseconds);

        setTimeElapsed(elapsedTimeFormatted);
      }, 1000);

      return () => clearInterval(elapsedTimeInterval);
    }
  }, [timeJoinedQueue]);

  return timeElapsed ? (
    <>
      <div>Searching...</div>
      <div>{timeElapsed}</div>
    </>
  ) : (
    <div>Joining queue...</div>
  );
}
