import Link from "next/link";
import SubmitButton from "@components/SubmitButton";
import { logIn } from "@utils/auth/userActions";

export default function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  return (
    <section>
      <h1>Log in</h1>

      <form>
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="you@example.com" required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton formAction={logIn} pendingText="Logging in...">
          Log in
        </SubmitButton>

        {searchParams?.message && <p>{searchParams.message}</p>}
      </form>
      <div>
        <Link href="/signup">Create account</Link>
      </div>
    </section>
  );
}
