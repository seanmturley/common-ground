"use client";

import { useEffect, useState } from "react";
import { useGetTimeJoinedQueue } from "@utils/matchmaking/useGetTimeJoinedQueue";
import { formatDuration } from "@utils/matchmaking/format-duration";

export default function QueueTimer() {
  const [timeElapsed, setTimeElapsed] = useState("");

  const timeJoinedQueue = useGetTimeJoinedQueue();

  useEffect(() => {
    if (timeJoinedQueue) {
      const elapsedTimeInterval = setInterval(() => {
        const currentTime = new Date().getTime();

        const elapsedMilliseconds = currentTime - timeJoinedQueue;
        const elapsedTimeFormatted = formatDuration(elapsedMilliseconds);

        setTimeElapsed(elapsedTimeFormatted);
      }, 1000);

      return () => clearInterval(elapsedTimeInterval);
    }
  }, [timeJoinedQueue]);

  return <div>{timeElapsed || "Please wait"}</div>;
}
