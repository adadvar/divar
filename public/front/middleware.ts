import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const cookie: any = cookieStore.get('token')
  const token = cookie && JSON.parse(cookie.value)
  const isAuthenticated = token && !!token.access_token

  if (!isAuthenticated) {
    const redirectUrl = new URL('/admin/login', request.nextUrl.origin).toString();
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}