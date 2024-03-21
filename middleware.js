import { NextResponse } from "next/server"
import { SignJWT, importJWK, jwtVerify } from "jose"

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  try {
    const token = request.cookies.get("token").value
    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET,
    }
    const secretKey = await importJWK(secretJWK, "HS256")
    const { payload } = await jwtVerify(token, secretKey)

    console.log("payload: ", payload)

    if (payload.email !== "abc@gg.com") {
      throw new Error("Invalid user")
    }

    const requestHeader = new Headers(request.header)
    requestHeader.set("user", JSON.stringify({ email: payload.email }))

    const response = NextResponse.next({
      request: {
        headers: requestHeader,
      },
    })

    return response
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/manage/blog/:path*",
}
