import Link from "next/link";
import SubmitButton from "@components/SubmitButton";
import { signUp } from "@utils/auth/userActions";

export default function Signup({
  searchParams
}: {
  searchParams: { message: string };
}) {
  return (
    <section>
      <h1>Sign up</h1>

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
        <SubmitButton formAction={signUp} pendingText="Signing up...">
          Sign up
        </SubmitButton>
        {searchParams?.message && <p>{searchParams.message}</p>}
      </form>
      <div>
        Already have an account? <Link href="/login">Log in</Link>
      </div>
    </section>
  );
}
