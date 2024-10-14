import styles from "./nav-layout.module.css";
import NavBar from "@components/nav-bar";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}
