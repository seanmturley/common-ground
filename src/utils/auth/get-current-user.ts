import type { User, SupabaseClient } from "@supabase/supabase-js";

type CurrentUser = {
  isAuthenticated: boolean;
  user: User | null;
};

export async function getCurrentUser(
  supabaseClient: SupabaseClient
): Promise<CurrentUser> {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data?.user) {
    return { isAuthenticated: false, user: null };
  }

  return { isAuthenticated: true, user: data.user };
}
