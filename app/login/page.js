"use client"
import { login } from "./action"
import { useFormState } from "react-dom"

export default function Page() {
  const initState = {
    message: "",
  }

  const [state, formAction] = useFormState(login, initState)

  return (
    <form action={formAction}>
      <div>
        Email <input name="email" />
      </div>
      <div>
        Password <input type="password" name="password" />
      </div>
      <div>Message: {state.message}</div>
      <button>Login</button>
    </form>
  )
}
