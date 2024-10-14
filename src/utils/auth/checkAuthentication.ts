import { type NextRequest } from "next/server";
import { addServerClient } from "@utils/supabase/server";

export async function checkAuthentication(
  request: NextRequest
): Promise<[boolean, string]> {
  const supabase = addServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  let redirectUrl = "";

  // Define protected routes
  // Descendent directories are also protected
  const protectedRoutes = ["/protected"];

  // Check if the URL path starts with a protected route
  const isProtectedRoute = protectedRoutes.some((protectedRoute) =>
    path.startsWith(protectedRoute)
  );

  // Require authentication to access a protected route
  const authenticationRequired = isProtectedRoute && !user;
  if (authenticationRequired)
    redirectUrl = `/login?redirectPath=${request.nextUrl.pathname}`;

  // Using the same approach as above,
  // prevent authenticated users from reaccessing auth routes
  const authRoutes = ["/create-account", "/login"];
  const isAuthRoute = authRoutes.some((authRoute) =>
    path.startsWith(authRoute)
  );
  const preventReauthentication = isAuthRoute && Boolean(user);
  if (preventReauthentication) {
    redirectUrl = "/protected";
  }

  const redirectRequired = authenticationRequired || preventReauthentication;

  return [redirectRequired, redirectUrl];
}
