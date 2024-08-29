import Link from "next/link";
import { logOut } from "@utils/auth/userActions";
import { createClient } from "@utils/supabase/server";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user ? (
    <div>
      Hi, {user.email}!
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  ) : (
    <Link href="/login">Log in</Link>
  );
}
