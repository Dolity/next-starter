"use client"

import { useState, useEffect } from "react"

async function getBlog(slug) {
  const response = await fetch(
    `https://65fc53849fc4425c652fcabe.mockapi.io/content/${slug}`
  )

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response.json()
}

export default function Page({ params }) {
  const [blogState, setBlogState] = useState({ name: "" })

  const initBlog = async () => {
    try {
      const blog = await getBlog(params.slug)
      setBlogState(blog)
    } catch (error) {
      console.log("error: ", error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setBlogState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `https://65fc53849fc4425c652fcabe.mockapi.io/content/${params.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogState),
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const responseData = await response.json()
      console.log("responseData: ", responseData)
    } catch (error) {
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    initBlog()
  }, [])

  return (
    <div>
      <h2>ID: {params.slug}</h2>
      <div>
        Blog Name: {blogState.name}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            value={blogState.name}
            onChange={handleChange}
          />
          <button>Update</button>
        </form>
      </div>
    </div>
  )
}
