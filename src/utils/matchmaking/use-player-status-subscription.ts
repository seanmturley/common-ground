import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useGetCurrentUser from "@utils/auth/use-get-current-user";
import { useGetPlayerDatum } from "@utils/matchmaking/use-get-player-datum";
import { addBrowserClient } from "@utils/supabase/browser";

type PlayerStatus = "idle" | "in_queue" | "ready_check" | "in_match";

export default function usePlayerStatusSubscription() {
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus | null>(null);

  const initialPlayerStatus = useGetPlayerDatum({
    tableName: "players",
    columnName: "status",
    initialValue: null
  });

  const supabase = addBrowserClient();
  const { user } = useGetCurrentUser(supabase);

  const player_id = user?.id as UUID;

  useEffect(() => {
    if (player_id) {
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
    }
  }, [player_id, supabase]);

  return playerStatus || initialPlayerStatus;
}
