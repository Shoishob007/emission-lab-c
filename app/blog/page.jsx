/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getBlogs } from "@/utils/api/getBlogs";


const categories = [
  { key: "all", label: "All" },
  { key: "Blog", label: "Blog" },
  { key: "News", label: "News" },
];

const WORD_LIMIT = 60;

function getExcerpt(html, wordLimit) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || "";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSub, setActiveSub] = useState("all");
  const [sortDate, setSortDate] = useState("desc");

useEffect(() => {
  async function fetchBlogs() {
    setLoading(true);
    try {
      const data = await getBlogs();
      setBlogPosts(data);
    } catch {
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  }
  fetchBlogs();
}, []);

  const subCategories = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(
          blogPosts.map((b) => b.sub_category || b.subCategory || "").filter(Boolean)
        )
      ),
    ],
    [blogPosts]
  );

  // Filtering logic
  let filtered = blogPosts;
  if (activeCategory !== "all") {
    filtered = filtered.filter(
      (b) =>
        (b.category || "").toLowerCase() === activeCategory.toLowerCase()
    );
  }
  if (activeSub !== "all") {
    filtered = filtered.filter(
      (b) =>
        (b.sub_category || b.subCategory || "").toLowerCase() ===
        activeSub.toLowerCase()
    );
  }
  filtered = filtered.sort((a, b) =>
    sortDate === "desc"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className="bg-white min-h-[100vh] py-14 px-2">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Filter size={20} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-bold">
                Our Articles
              </span>
            </div>
            <h1
              className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight mb-1"
              style={{
                fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
                letterSpacing: 0,
                lineHeight: 1.13,
              }}
            >
              Explore Our Latest <span className="text-primary">Stories</span>
            </h1>
            <p className="text-[#6c7a77] text-lg max-w-2xl mt-2">
              Find the latest updates, news, and in-depth articles on
              sustainability, innovation, and more. Filter by type, topic or
              date to discover what matters to you.
            </p>
          </div>
          {/* Filter bar */}
          <div className="w-full md:w-auto">
            <div className="flex gap-4 items-center justify-end flex-wrap">
              {/* Category Tabs */}
              <div className="flex gap-1 bg-[#f4f7ec] rounded-full p-1 shadow-sm">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                      activeCategory === c.key
                        ? "bg-btn-primary text-white shadow"
                        : "bg-transparent text-[#163820] hover:bg-btn-primary/10"
                    }`}
                    onClick={() => setActiveCategory(c.key)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {/* Sub-category filter */}
              <div className="relative">
                <select
                  value={activeSub}
                  onChange={(e) => setActiveSub(e.target.value)}
                  className="px-6 py-2 rounded-full bg-[#f4f7ec] text-[#163820] border border-[#eaeaea] font-semibold text-sm focus:ring-2 focus:ring-[#FFA726] appearance-none"
                  style={{ minWidth: 150 }}
                >
                  {subCategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-btn-primary">
                  <ChevronDown size={16} />
                </span>
              </div>
              {/* Date sort */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f7ec] text-[#163820] border border-[#eaeaea] font-semibold text-sm transition hover:bg-btn-primary/10"
                onClick={() =>
                  setSortDate(sortDate === "desc" ? "asc" : "desc")
                }
                aria-label="Sort by date"
              >
                <Calendar size={18} className="text-btn-primary" />
                {sortDate === "desc" ? (
                  <>
                    Newest
                    <ChevronDown size={16} />
                  </>
                ) : (
                  <>
                    Oldest
                    <ChevronUp size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full text-center text-lg text-muted-foreground py-24">
              Loading articles...
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center text-lg text-muted-foreground py-24">
              No articles found.
            </div>
          ) : (
            filtered.map((post) => (
              <div
                key={post.id}
                className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow-sm group flex flex-col transition"
              >
                <div className="h-[220px] w-full overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Sub-category badge */}
                  {/* <span className="absolute top-3 left-3 bg-btn-primary text-white rounded-full px-3 py-1 text-xs font-bold uppercase shadow z-10">
                    {(post.sub_category || post.subCategory || "").toString()}
                  </span> */}
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#767676] text-xs">
                      {post.date}
                    </span>
                    <span className="text-primary text-xs font-bold uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#163820] mb-2 mt-1">
                    {post.title}
                  </h3>
                  <div className="text-[#767676] text-sm mb-3 flex-1 prose prose-sm max-w-none line-clamp-4">
                    {/* Excerpt with word limit */}
                    {getExcerpt(post.excerpt, WORD_LIMIT)}
                  </div>
                  {/* <span className="text-[#163820] font-semibold text-sm mb-3">
                    {post.author}
                  </span> */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-auto font-semibold text-btn-primary flex items-center gap-2 hover:underline text-sm w-fit"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-14 flex justify-center">
          <nav className="inline-flex gap-1">
            <button className="px-4 py-2 rounded-l-full bg-[#f4f7ec] text-[#163820] font-semibold transition hover:bg-btn-primary/10 flex items-center gap-1">
              <ArrowLeft size={18} /> Prev
            </button>
            <button className="px-4 py-2 bg-btn-primary text-white font-bold transition">
              1
            </button>
            <button className="px-4 py-2 rounded-r-full bg-[#f4f7ec] text-[#163820] font-semibold transition hover:bg-btn-primary/10 flex items-center gap-1">
              Next <ArrowRight size={18} />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}