import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { addServerClient } from "@utils/supabase/server";

const errorRedirect = "/login?message=Could not authenticate user";

export async function signUp(formData: FormData) {
  "use server";

  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = addServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/api/authCallback`
    }
  });

  if (error) {
    return redirect(errorRedirect);
  }

  return redirect("/login?message=Check email to continue sign in process");
}

export async function logIn(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = addServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return redirect(errorRedirect);
  }

  return redirect("/protected");
}

export async function logOut() {
  "use server";

  const supabase = addServerClient();
  await supabase.auth.signOut();
  return redirect("/");
}
