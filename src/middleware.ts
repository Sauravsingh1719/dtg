import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware to protect admin routes
export async function middleware(req:any) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    // Check if the user is trying to access any admin route
    if (pathname.startsWith("/admin")) {
        // If not logged in, redirect to sign-in
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
    }

    // If logged in and trying to access /auth/signin, redirect to /admin
    if (token && pathname === "/auth/signin") {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next(); // Allow the request to proceed
}

// Configure which paths to protect with middleware
export const config = {
    matcher: [
        "/admin",
        "/admin/posts",
        "/admin/testimonials",
        "/admin/add-posts",
        "/admin/add-testimonials",
        "/auth/signin"
    ]
};
