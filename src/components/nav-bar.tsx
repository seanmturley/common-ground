import Link from "next/link";
import styles from "./nav-bar.module.css";
import AuthButton from "@components/auth-button";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.logo__image}></div>
        <h1 className={styles.logo__title}>
          <Link href="/">Common Ground</Link>
        </h1>
      </div>

      <ul className={styles.content}>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/rankings">Rankings</Link>
        </li>
      </ul>

      <AuthButton />

      <Link href="/play" className={styles.play}>
        PLAY
      </Link>
    </nav>
  );
}
