import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useGetCurrentUser from "@utils/auth/use-get-current-user";
import { addBrowserClient } from "@utils/supabase/browser";

export default function useGetPlayerStatus() {
  const [playerStatus, setPlayerStatus] = useState(null);

  const supabase = addBrowserClient();
  const { user } = useGetCurrentUser(supabase);

  const player_id = user?.id as UUID;

  useEffect(() => {
    if (player_id) {
      (async () => {
        const { data, error } = await supabase
          .from("players")
          .select("status")
          .eq("player_id", player_id)
          .single();

        if (error) {
          console.log(`Error getting player status: ${error.message}`);
        } else {
          setPlayerStatus(data.status);
        }
      })();
    }
  }, [player_id, supabase]);

  useEffect(() => {
    const playerStatusSubscription = supabase
      .channel("player-status")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "players",
          filter: `player_id=eq.${player_id}`
        },
        (payload) => {
          setPlayerStatus(payload.new.status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(playerStatusSubscription);
    };
  }, [player_id, setPlayerStatus, supabase]);

  return playerStatus;
}
