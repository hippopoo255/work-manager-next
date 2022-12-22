import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '~/middleware/auth'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  return await authMiddleware(request)
}

export const config = {
  matcher: ['/mypage/:path*', '/signin'],
}
