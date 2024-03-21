"use server"

import { SignJWT, importJWK } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(state, formData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (email !== "abc@gg.com" && password !== "1234") {
    return { message: "Login Fail" }
  }

  console.log(email, password)

  const secretJWK = {
    kty: "oct",
    k: process.env.JOSE_SECRET,
  }

  const secretKey = await importJWK(secretJWK, "HS256")
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey)

  cookies().set("token", token)

  redirect("manage/blog")
}
