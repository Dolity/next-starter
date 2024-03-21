import Link from "next/link"

async function getBlogs() {
  const response = await fetch(
    "https://65fc53849fc4425c652fcabe.mockapi.io/content"
  )

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response.json()
}

export default async function Page() {
  const blogs = await getBlogs()
  // console.log(blogs)
  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog, index) => (
        <div key={index}>
          <h3>
            {blog.id} {blog.name} {blog.content}{" "}
            <Link href={`blog/${blog.id}`} className="px-4 bg-blue-400">
              Go to read blog...
            </Link>
          </h3>
        </div>
      ))}
    </div>
  )
}
