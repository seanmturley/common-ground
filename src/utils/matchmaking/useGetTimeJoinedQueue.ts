import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useGetCurrentUser from "@utils/auth/use-get-current-user";
import { addBrowserClient } from "@utils/supabase/browser";

export function useGetTimeJoinedQueue() {
  const [timeJoinedQueue, setTimeJoinedQueue] = useState(0);

  const supabase = addBrowserClient();
  const { user } = useGetCurrentUser(supabase);

  const player_id = user?.id as UUID;

  useEffect(() => {
    if (player_id) {
      (async () => {
        const { data, error } = await supabase
          .from("queue")
          .select("created_at")
          .eq("player_id", player_id)
          .limit(1)
          .single();

        if (error) {
          console.error(`Error getting time joined queue: ${error.message}`);
        } else {
          const timeJoined = new Date(data?.created_at).getTime();
          setTimeJoinedQueue(timeJoined);
        }
      })();
    }
  }, [player_id, supabase]);

  return timeJoinedQueue;
}
