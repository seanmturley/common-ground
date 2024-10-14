import Link from "next/link";
import styles from "./authentication-layout.module.css";

export default function AuthorizationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <Link href="/">
          <div>Logo</div>
        </Link>
        {children}
      </section>
    </main>
  );
}
