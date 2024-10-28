"use client";

import { useActionState } from "react";
import styles from "./auth-form.module.css";
import AuthLink from "@components/auth-link";
import SubmitButton from "@components/submit-button";

const initialFormState: FormState = {
  email: "",
  message: "",
  mtgaAccountId: "",
  password: ""
};

export default function AuthForm({ ...form }: AuthForm) {
  const [formState, formAction] = useActionState(
    form.formAction,
    initialFormState
  );

  return (
    <>
      <form className={styles.form}>
        <h1>{form.name}</h1>

        <div className={styles.form_field}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            defaultValue={formState.email || ""}
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
            defaultValue={formState.password || ""}
            name="password"
            placeholder="••••••••"
            type="password"
            required
          />
        </div>

        {form.requestMtgaAccountId && (
          <div className={styles.form_field}>
            <label htmlFor="mtga-account-id">MTG Arena account ID</label>
            <input
              className={styles.input}
              defaultValue={formState.mtgaAccountId || ""}
              name="mtga-account-id"
              placeholder="DisplayName#12345"
              type="text"
              required
            />
          </div>
        )}

        <input type="hidden" name="redirectPath" value={form.redirectPath} />

        <SubmitButton formAction={formAction} pendingText={form.pendingText}>
          {form.name}
        </SubmitButton>

        <div aria-live="polite">
          {formState.message && <p>{formState.message}</p>}
        </div>
      </form>

      <div className={styles.auth_question}>
        {form.authLinkQuestion} <AuthLink linkPath={form.authLinkPath} />
      </div>
    </>
  );
}
