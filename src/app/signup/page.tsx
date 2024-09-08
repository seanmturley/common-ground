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
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

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
