import AuthLink from "@components/auth-link";
import { getCurrentUser } from "@utils/auth/get-current-user";
import { logOut } from "@utils/auth/user-actions";
import { addServerClient } from "@utils/supabase/server";

export default async function AuthButton() {
  const supabase = await addServerClient();
  const { user } = await getCurrentUser(supabase);

  return user ? (
    <div>
      Hi, {user.email}!
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  ) : (
    <AuthLink linkPath="/login" />
  );
}
