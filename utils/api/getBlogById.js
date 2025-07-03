export async function getBlogById(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/articles/posts/${id}/`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Blog not found");
    return res.json();
}