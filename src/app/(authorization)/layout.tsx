import styles from "./AuthorizationLayout.module.css";

export default function AuthorizationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <div>Logo</div>
        {children}
      </section>
    </main>
  );
}
