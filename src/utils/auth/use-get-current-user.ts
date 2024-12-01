import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser } from "@utils/auth/get-current-user";
import { addBrowserClient } from "@utils/supabase/browser";

export default function useGetCurrentUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = addBrowserClient();
      const { isAuthenticated, user } = await getCurrentUser(supabase);

      setIsAuthenticated(isAuthenticated);
      setUser(user);
    })();
  }, []);

  return { isAuthenticated, user };
}
