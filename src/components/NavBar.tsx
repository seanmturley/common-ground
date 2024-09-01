import Link from "next/link";
import AuthButton from "@components/AuthButton";

export default function NavBar() {
  return (
    <nav>
      <h1>
        <Link href="/">Common Ground</Link>
      </h1>
      <Link href="/play">PLAY</Link>
      <ul>
        <li>
          <Link href="/rankings">Rankings</Link>
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
      </ul>
      <AuthButton />
    </nav>
  );
}
