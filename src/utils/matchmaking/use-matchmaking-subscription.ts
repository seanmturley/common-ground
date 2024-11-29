import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { addBrowserClient } from "@utils/supabase/browser";

export default async function useMatchmakingSubscription() {
  const [isMatched, setIsMatched] = useState(false);

  const supabase = addBrowserClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const id = user?.id as UUID;

  useEffect(() => {
    const subscription = supabase
      .channel("matchmaking")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "matchmaking_queue",
          filter: `id=eq.${id}`
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
  });

  return isMatched;
}
