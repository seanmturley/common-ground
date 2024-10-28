"use client";

import { useActionState } from "react";
import styles from "./auth-form.module.css";
import AuthLink from "@components/auth-link";
import SubmitButton from "@components/submit-button";

export default function AuthForm({ ...form }: AuthForm) {
  const [errorMessage, formAction] = useActionState(form.formAction, "");

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

        {form.requestMtgaAccountId && (
          <div className={styles.form_field}>
            <label htmlFor="mtga-account-id">MTG Arena account ID</label>
            <input
              className={styles.input}
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

        <div aria-live="polite">{errorMessage && <p>{errorMessage}</p>}</div>
      </form>

      <div className={styles.auth_question}>
        {form.authLinkQuestion} <AuthLink linkPath={form.authLinkPath} />
      </div>
    </>
  );
}
