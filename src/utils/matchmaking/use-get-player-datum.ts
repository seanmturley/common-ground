import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useGetCurrentUser from "@utils/auth/use-get-current-user";
import { addBrowserClient } from "@utils/supabase/browser";

export default function useGetPlayerDatum<
  T extends TableName,
  C extends ColumnName<T>
>({
  tableName,
  columnName,
  initialValue
}: {
  tableName: T;
  columnName: C;
  initialValue: Datum<T, C> | null;
}) {
  const [playerDatum, setPlayerDatum] = useState(initialValue);

  const supabase = addBrowserClient();
  const { user } = useGetCurrentUser(supabase);

  const player_id = user?.id as UUID;

  useEffect(() => {
    if (player_id) {
      (async () => {
        const { data, error } = await supabase
          .from(tableName)
          .select(columnName)
          .eq("player_id", player_id)
          .single();

        if (error) {
          console.error(
            `Error fetching ${columnName} from ${tableName}: ${error.message}`
          );
        } else if (!data) {
          console.error(
            `No data found when fetching ${columnName} from ${tableName}`
          );
        } else {
          const columnData = data as unknown as Record<C, Datum<T, C>>;
          setPlayerDatum(columnData[columnName]);
        }
      })();
    }
  }, [columnName, player_id, supabase, tableName]);

  return playerDatum;
}
