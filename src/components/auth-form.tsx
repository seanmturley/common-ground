import styles from "./auth-form.module.css";
import AuthLink from "@components/auth-link";
import SubmitButton from "@components/submit-button";

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
      <form className={styles.form}>
        <h1>{form.name}</h1>

        <div className={styles.form_field}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            name="email"
            placeholder="you@example.com"
            type="email"
            required
          />
        </div>

        <div className={styles.form_field}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            name="password"
            placeholder="••••••••"
            type="password"
            required
          />
        </div>

        <input type="hidden" name="redirectPath" value={form.redirectPath} />

        <SubmitButton
          formAction={form.formAction}
          pendingText={form.pedingText}
        >
          {form.name}
        </SubmitButton>

        {form.message && <p>{form.message}</p>}
      </form>

      <div className={styles.auth_question}>
        {form.authLinkQuestion} <AuthLink linkPath={form.authLinkPath} />
      </div>
    </>
  );
}
