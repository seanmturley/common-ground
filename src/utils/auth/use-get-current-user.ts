import { useEffect, useState } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getCurrentUser } from "@utils/auth/get-current-user";

export default function useGetCurrentUser(supabaseClient: SupabaseClient) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const { isAuthenticated, user } = await getCurrentUser(supabaseClient);

      setIsAuthenticated(isAuthenticated);
      setUser(user);
    })();
  }, [supabaseClient]);

  return { isAuthenticated, user };
}
