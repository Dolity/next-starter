async function getBlog(slug) {
  const response = await fetch(
    `https://65fc53849fc4425c652fcabe.mockapi.io/content/${slug}`
  )

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response.json()
}

export default async function Page({ params }) {
  const blog = await getBlog(params.slug)
  return (
    <div>
      <h2>ID: {params.slug}</h2>
      <h1>Name: {blog.name}</h1>
      <p>Content: {blog.content}</p>
    </div>
  )
}
