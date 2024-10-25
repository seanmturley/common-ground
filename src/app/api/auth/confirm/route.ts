import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { addServerClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectUrl = searchParams.get("redirectUrl") ?? "/";

  if (token_hash && type) {
    const supabase = await addServerClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(redirectUrl);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
