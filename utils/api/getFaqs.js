export async function getFaqs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/articles/faqs?is_active=true`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch FAQs");
    const data = await res.json();
    // sort by id ascending
    return data.sort((a, b) => a.id - b.id);
}