"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addServerClient } from "@utils/supabase/server";

export async function createAccount(formData: FormData) {
  const supabase = await addServerClient();

  // Type-casting here for convenience
  // Ideally, the inputs should be validated
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const mtgaAccountId = formData.get("mtga-account-id") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        mtga_account_id: mtgaAccountId
      }
    }
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/confirm-email");
}

export async function logIn(formData: FormData) {
  const supabase = await addServerClient();

  // Type-casting here for convenience
  // Ideally, the inputs should be validated
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectPath = formData.get("redirectPath") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath(redirectPath || "/", "layout");
  redirect(redirectPath || "/");
}

export async function logOut() {
  const supabase = await addServerClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
