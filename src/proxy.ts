import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith('/profile') || pathname.startsWith('/orders') || pathname.startsWith('/admin') || pathname.startsWith('/checkout');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/profile', req.nextUrl));
    }
    return;
  }

  if (isProtectedRoute && !isLoggedIn) {
    let from = pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(from)}`, req.nextUrl));
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
