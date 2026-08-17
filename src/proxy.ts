import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (în Next.js 16 înlocuiește `middleware.ts`, aceeași funcționalitate).
 *
 * Are exact două treburi:
 *
 *  1. Reîmprospătează sesiunea Supabase. Token-urile expiră, iar un Server
 *     Component nu poate scrie cookie-uri; dacă nimeni nu le reînnoiește,
 *     utilizatorul e deconectat în mijlocul lucrului.
 *
 *  2. Face o verificare OPTIMISTĂ pe /admin: dacă nu există niciun cookie de
 *     sesiune, redirectează la login fără a atinge baza de date. Rulează pe
 *     fiecare cerere, inclusiv pe rutele preîncărcate, deci trebuie să rămână
 *     ieftin.
 *
 * Autorizarea reală (rol, profil activ) se face în `src/lib/auth/dal.ts`, lângă
 * date. Aici nu se decide nimic despre drepturi.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fără Supabase configurat nu există sesiuni de reînnoit. Panoul rămâne
  // inaccesibil, dar site-ul public funcționează pe datele din cod.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Necesar: `getUser()` declanșează reîmprospătarea și scrierea cookie-urilor.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin && !isLogin && !user) {
    const loginUrl = new URL("/admin/login", request.url);
    // Ca după autentificare să revină unde voia să ajungă.
    if (pathname !== "/admin") loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLogin && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  /**
   * Rulează pe tot, mai puțin fișierele statice și optimizatorul de imagini.
   * Sesiunea trebuie reînnoită și pe paginile publice, altfel un editor care
   * navighează pe site și revine în panou se trezește deconectat.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$).*)",
  ],
};
