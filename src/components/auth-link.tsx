"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const authPaths = ["/login", "/create-account"];
type AuthPaths = "/login" | "/create-account";

export default function AuthLink({ linkPath }: { linkPath: AuthPaths }) {
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const redirectPathKey = "?redirectPath=";
  const previousRedirectPath = searchParams.get("redirectPath");

  let redirectQueryString = "";

  if (previousRedirectPath) {
    redirectQueryString = redirectPathKey + previousRedirectPath;
  } else if (!authPaths.includes(currentPathname)) {
    redirectQueryString = redirectPathKey + currentPathname;
  }

  const linkText = linkPath === "/login" ? "Log in" : "Create account";

  return <Link href={`${linkPath}${redirectQueryString}`}>{linkText}</Link>;
}
