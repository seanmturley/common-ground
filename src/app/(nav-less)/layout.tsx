import Link from "next/link";
import styles from "./nav-less-layout.module.css";

export default function NavLessLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <Link href="/">
        <div>Logo</div>
      </Link>
      {children}
    </main>
  );
}
