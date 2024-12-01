import type { SupabaseClient, User } from "@supabase/supabase-js";

export async function getCurrentUser(supabaseClient: SupabaseClient) {
  let isAuthenticated = false;
  let user: User | null = null;

  const { data, error } = await supabaseClient.auth.getUser();

  if (!error && data?.user) {
    isAuthenticated = true;
    user = data.user;
  }

  return { isAuthenticated, user };
}
