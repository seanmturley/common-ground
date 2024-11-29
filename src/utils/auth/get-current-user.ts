import type { User, SupabaseClient } from "@supabase/supabase-js";

type GetCurrentUser = {
  isAuthenticated: boolean;
  user: User | null;
};

export async function getCurrentUser(
  supabaseClient: SupabaseClient
): Promise<GetCurrentUser> {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data?.user) {
    return { isAuthenticated: false, user: null };
  }

  console.log(data.user);

  return { isAuthenticated: true, user: data.user };
}
