import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { addServerClient } from "@utils/supabase/server";

const errorRedirect = "?message=Could not authenticate user";

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

  return redirect("?message=Check email to continue sign up process");
}

export async function logIn(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectPath = formData.get("redirectPath") as string;
  const supabase = addServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return redirect(errorRedirect);
  }

  return redirect(redirectPath || "/");
}

export async function logOut() {
  "use server";

  const supabase = addServerClient();
  await supabase.auth.signOut();
  return redirect("/");
}
