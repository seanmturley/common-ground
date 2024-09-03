import Link from "next/link";
import styles from "./NavBar.module.css";
import AuthButton from "@components/AuthButton";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div>
        <div>LOGO</div>
        <h1>
          <Link href="/">Common Ground</Link>
        </h1>
      </div>

      <div>
        <ul>
          <li>
            <Link href="/articles">Articles</Link>
          </li>
          <li>
            <Link href="/rankings">Rankings</Link>
          </li>
        </ul>
      </div>

      <div>
        <AuthButton />
      </div>

      <div>
        <Link href="/play">PLAY</Link>
      </div>
    </nav>
  );
}
