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

  // RBAC Routing Logic
  if (user && request.nextUrl.pathname === '/') {
    // Determine the exact role to perform redirection
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, subsidiary_id')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'super_admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (profile?.subsidiary_id) {
      return NextResponse.redirect(new URL(`/workspace/${profile.subsidiary_id}`, request.url))
    } else {
      return NextResponse.redirect(new URL('/workspace', request.url))
    }
  }

  // Authentication Boundary Setup
  // All URLs require auth except the home page '/'
  if (!user && request.nextUrl.pathname !== '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
