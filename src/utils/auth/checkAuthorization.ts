import { type NextRequest } from "next/server";
import { addServerClient } from "@utils/supabase/server";

export async function checkAuthorization(request: NextRequest) {
  const supabase = addServerClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Define protected routes - descendent directories are also protected
  const protectedRoutes = ["/protected"];

  // Check if the URL path starts with a protected route
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((protectedRoute) =>
    path.startsWith(protectedRoute)
  );

  // Require authorization if the user tries to access a protected
  // route without authentication
  const requiresAuthorization = isProtectedRoute && !user;

  return requiresAuthorization;
}
