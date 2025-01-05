import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const userAgent = request.headers.get("user-agent") || "";
	const isMobile = /mobile|android|iphone|ipad|tablet/i.test(
		userAgent.toLowerCase()
	);

	const response = NextResponse.next();
	response.headers.set("x-is-mobile", String(isMobile));
	return response;
}

export const config = {
	matcher: "/movies/:path*",
};
