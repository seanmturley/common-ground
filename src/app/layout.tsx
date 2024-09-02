import "/node_modules/modern-normalize/modern-normalize.css";
import "./globals.css";
import styles from "./RootLayout.module.css";
import NavBar from "@components/NavBar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Common Ground",
  description: "Play Pauper on Magic: The Gathering Arena"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
