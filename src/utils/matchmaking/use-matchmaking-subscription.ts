import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useGetCurrentUser from "@utils/auth/use-get-current-user";
import { addBrowserClient } from "@utils/supabase/browser";

export default function useMatchmakingSubscription() {
  const [isMatched, setIsMatched] = useState(false);

  const supabase = addBrowserClient();
  const { user } = useGetCurrentUser(supabase);

  const player_id = user?.id as UUID;

  useEffect(() => {
    const subscription = supabase
      .channel("matchmaking")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "matchmaking_queue",
          filter: `player_id=eq.${player_id}`
        },
        (payload) => {
          const updatedData = payload.new;
          setIsMatched(updatedData.is_matched);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [player_id, supabase]);

  return isMatched;
}
