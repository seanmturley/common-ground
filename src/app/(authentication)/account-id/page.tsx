import styles from "./account-id.module.css";
import SubmitButton from "@components/submit-button";
import { addAccountId } from "@utils/auth/user-actions";

export default function AccountId() {
  return (
    <form className={styles.form}>
      <h1>Add MTG Arena account ID</h1>

      <div className={styles.form_field}>
        <label htmlFor="account-id">Account ID</label>
        <input
          className={styles.input}
          name="account-id"
          placeholder="DisplayName#12345"
          type="text"
          required
        />
      </div>

      <SubmitButton
        formAction={addAccountId}
        pendingText={"Submitting account ID..."}
      >
        Add account ID
      </SubmitButton>
    </form>
  );
}
