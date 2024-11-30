import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@utils/auth/get-current-user";
import { addBrowserClient } from "@utils/supabase/browser";

export default async function useMatchmakingSubscription() {
  const [isMatched, setIsMatched] = useState(false);

  const supabase = addBrowserClient();
  const { isAuthenticated, user } = await getCurrentUser(supabase);

  if (!isAuthenticated) {
    redirect("/login");
  }

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
  });

  return isMatched;
}
