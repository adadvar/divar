import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
  // const cookieStore = cookies()
  // const cookie: any = cookieStore.get('token')
  // const token = cookie && JSON.parse(cookie.value)
  // const isAuthenticated = !!token
  const isAuthenticated = request.cookies.has('token')
  const { pathname } = request.nextUrl;

  if (isAuthenticated && pathname.startsWith('/admin/login')) {
    return NextResponse.rewrite(new URL('/admin/dashboard', request.url))
  }
  if (!isAuthenticated) {
    if (pathname.startsWith('/new')) {
      return NextResponse.rewrite(new URL('/', request.url))

    }
    return NextResponse.rewrite(new URL('/admin/login', request.url))

  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/new']
}