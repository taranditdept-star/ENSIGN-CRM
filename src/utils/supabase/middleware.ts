import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Authentication & Public Route Logic
  const isAuthPage = request.nextUrl.pathname === '/'
  const isCapturePage = request.nextUrl.pathname.startsWith('/capture')
  const isPublicRoute = isAuthPage || isCapturePage

  // 1. Redirection for logged-in users on the landing page
  if (user && isAuthPage) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, subsidiary_id')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'super_admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (profile?.subsidiary_id) {
      return NextResponse.redirect(new URL(`/workspace/${profile.subsidiary_id}`, request.url))
    }
    // Fallback if no specific role/branch is found
    return NextResponse.redirect(new URL('/workspace', request.url))
  }

  // 2. Protection Boundary: All non-public routes require authentication
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    // Optional: add a redirect parameter to return here after login
    // url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
