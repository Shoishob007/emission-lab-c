export async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/articles/posts/?is_active=true`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  const data = await res.json();
  return data;
}