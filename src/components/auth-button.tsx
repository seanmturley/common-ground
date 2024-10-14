import { logOut } from "@utils/auth/user-actions";
import { addServerClient } from "@utils/supabase/server";
import AuthLink from "@components/auth-link";

export default async function AuthButton() {
  const supabase = addServerClient();

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
    <AuthLink linkPath="/login" />
  );
}
