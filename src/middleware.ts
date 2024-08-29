import { type NextRequest, NextResponse } from "next/server";
import { checkAuthorization } from "@utils/auth/checkAuthorization";
import { updateSession } from "@utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const authorizationRequired = await checkAuthorization(request);

  // If authorizationRequired, redirect to /login
  // Otherwise, pass on the initial request
  return authorizationRequired
    ? NextResponse.redirect(new URL("/login", request.nextUrl))
    : response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
