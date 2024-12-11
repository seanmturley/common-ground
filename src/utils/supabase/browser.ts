import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@utils/supabase/generated-types";

export function addBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
