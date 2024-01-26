import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {

  const isAuthenticated = request.cookies.has('token')
  const { pathname } = request.nextUrl;

  if (isAuthenticated && pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }
  if (!isAuthenticated) {
    if (pathname.startsWith('/new')) {
      return NextResponse.redirect(new URL('/', request.url))

    }
    if (!pathname.startsWith('/admin/login'))
      return NextResponse.redirect(new URL('/admin/login', request.url))

  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard:path*', '/new']
}