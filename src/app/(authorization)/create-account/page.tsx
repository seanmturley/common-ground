import styles from "../Authorization.module.css";
import AuthLink from "@components/AuthLink";
import SubmitButton from "@components/SubmitButton";
import { createAccount } from "@utils/auth/userActions";

export default function CreateAccount({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  return (
    <>
      <h1>Create account</h1>

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
        <SubmitButton
          formAction={createAccount}
          pendingText="Creating account..."
        >
          Create account
        </SubmitButton>

        {searchParams?.message && <p>{searchParams.message}</p>}
      </form>
      <div>
        Already have an account? <AuthLink linkPath="/login" />
      </div>
    </>
  );
}
