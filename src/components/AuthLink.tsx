"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const linkPaths = ["/login", "/signup"];
type LinkPaths = (typeof linkPaths)[number];

export default function AuthLink({ linkPath }: { linkPath: LinkPaths }) {
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const defaultRedirectPath = linkPaths.includes(currentPathname)
    ? "/"
    : currentPathname;

  const redirectPath = searchParams.get("redirectPath") || defaultRedirectPath;

  const linkText = linkPath === "/login" ? "Log in" : "Create account";

  return (
    <Link href={`${linkPath}?redirectPath=${redirectPath}`}>{linkText}</Link>
  );
}
