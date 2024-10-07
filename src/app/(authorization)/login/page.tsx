import Link from "next/link";
import styles from "../Authorization.module.css";
import SubmitButton from "@components/SubmitButton";
import { logIn } from "@utils/auth/userActions";

export default function Login({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  const signupLink = searchParams?.redirectPath
    ? `/signup?redirectPath=${searchParams?.redirectPath}`
    : "/signup";

  return (
    <>
      <h1>Log in</h1>

      <form className={styles.form}>
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="you@example.com" required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <input
          type="hidden"
          name="redirectPath"
          value={searchParams?.redirectPath}
        />
        <SubmitButton formAction={logIn} pendingText="Logging in...">
          Log in
        </SubmitButton>

        {searchParams?.message && <p>{searchParams.message}</p>}
      </form>
      <div>
        <Link href={signupLink}>Create account</Link>
      </div>
    </>
  );
}
