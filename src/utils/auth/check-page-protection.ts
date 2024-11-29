import { type NextRequest } from "next/server";
import { getCurrentUser } from "@utils/auth/get-current-user";
import { addServerClient } from "@utils/supabase/server";

export async function checkPageProtection(
  request: NextRequest
): Promise<[boolean, string]> {
  const supabase = await addServerClient();
  const { isAuthenticated } = await getCurrentUser(supabase);

  const path = request.nextUrl.pathname;

  let redirectUrl = "";

  // Define protected routes
  // Descendent directories are also protected
  const protectedRoutes = ["/play", "/protected"];

  // Check if the URL path starts with a protected route
  const isProtectedRoute = protectedRoutes.some((protectedRoute) =>
    path.startsWith(protectedRoute)
  );

  // Require authentication to access a protected route
  const authenticationRequired = isProtectedRoute && !isAuthenticated;
  if (authenticationRequired)
    redirectUrl = `/login?redirectPath=${request.nextUrl.pathname}`;

  // Using the same approach as above,
  // prevent authenticated users from reaccessing auth routes
  const authRoutes = ["/create-account", "/login"];
  const isAuthRoute = authRoutes.some((authRoute) =>
    path.startsWith(authRoute)
  );
  const preventReauthentication = isAuthRoute && isAuthenticated;
  if (preventReauthentication) {
    redirectUrl = "/protected";
  }

  const redirectRequired = authenticationRequired || preventReauthentication;

  return [redirectRequired, redirectUrl];
}
