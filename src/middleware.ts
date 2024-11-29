import { type NextRequest, NextResponse } from "next/server";
import { checkPageProtection } from "@utils/auth/check-page-protection";
import { updateSession } from "@utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const [redirectRequired, redirectUrl] = await checkPageProtection(request);

  return redirectRequired
    ? NextResponse.redirect(new URL(redirectUrl, request.nextUrl))
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
