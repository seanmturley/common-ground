import styles from "./NavLayout.module.css";
import NavBar from "@components/NavBar";

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
