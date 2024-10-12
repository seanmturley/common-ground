import styles from "./AuthForm.module.css";
import AuthLink from "@components/AuthLink";
import SubmitButton from "@components/SubmitButton";

type Form = {
  name: string;
  formAction: (formData: FormData) => Promise<never>;
  pedingText: string;
  authLinkQuestion: string;
  authLinkPath: string;
  redirectPath: string;
  message: string;
};

export default function AuthForm({ ...form }: Form) {
  return (
    <>
      <h1>{form.name}</h1>

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
        <input type="hidden" name="redirectPath" value={form.redirectPath} />
        <SubmitButton
          formAction={form.formAction}
          pendingText={form.pedingText}
        >
          {form.name}
        </SubmitButton>

        {form.message && <p>{form.message}</p>}
      </form>

      <div>
        {form.authLinkQuestion} <AuthLink linkPath={form.authLinkPath} />
      </div>
    </>
  );
}
