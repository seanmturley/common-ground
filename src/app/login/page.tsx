import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { logIn, signUp } from "@/utils/auth/userActions";

export default function Login({
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
        <SubmitButton formAction={signUp} pendingText="Signing up...">
          Sign up
        </SubmitButton>
        {searchParams?.message && <p>{searchParams.message}</p>}
      </form>
    </section>
  );
}
