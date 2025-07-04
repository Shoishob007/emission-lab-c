/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBlogs } from "@/utils/api/getBlogs";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const data = await getBlogs();
        // Only take first 3 posts
        setBlogPosts(data.slice(0, 3));
      } catch {
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="relative py-20 bg-white flex items-center justify-center">
        <span className="text-lg text-muted-foreground">Loading articles...</span>
      </section>
    );
  }

  if (!blogPosts.length) {
    return (
      <section className="relative py-20 bg-white flex items-center justify-center">
        <span className="text-lg text-muted-foreground">No articles found.</span>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.03,
        }}
      />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 sm:gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Leaf size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Latest Articles
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize">
              Recent articles and updates{" "}
              <br className="hidden sm:block" />
              on{" "}
              <span className="text-primary">
                sustainability & conservation
              </span>
            </h2>
          </div>
          <div className="flex-1 flex justify-end w-full">
            <Link href="/blog">
              <Button
                size="lg"
                className="bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base px-8 py-3 rounded-lg shadow-lg transition flex items-center gap-2 mx-auto sm:mx-0 sm:w-fit"
                type="button"
              >
                View All Articles <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog grid */}
        {/* Mobile: all three as large cards. Desktop: grid with large + two small cards */}
        <div className="md:hidden flex flex-col gap-8 mt-12">
          {blogPosts.map((post, idx) => (
            <div
              key={post.id}
              className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow group flex flex-col h-full min-h-[400px]"
            >
              <div className="h-[280px] w-full overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Sub-category badge */}
                {/* <span className="absolute top-2 left-2 bg-btn-primary text-white rounded-full px-3 py-1 text-xs font-bold uppercase shadow z-10">
                  {(post.sub_category || post.subCategory || "").toString()}
                </span> */}
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#767676] text-sm">
                    {post.date}
                  </span>
                  <span className="text-primary text-xs font-bold uppercase">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#163820] mb-3">
                  {post.title}
                </h3>
                <p className="text-[#767676] text-base mb-4 line-clamp-5">
                  {/* Strip html tags for preview */}
                  {typeof post.excerpt === "string"
                    ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 180) + (post.excerpt.length > 180 ? '...' : '')
                    : ""}
                </p>
                {/* <span className="text-[#163820] font-semibold text-base mb-5">
                  {post.author}
                </span> */}
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-auto font-semibold text-btn-primary flex items-center gap-2 hover:underline text-base w-fit"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-12">
          {/* Left: Large card */}
          <div className="md:col-span-6 flex flex-col">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow group flex flex-col h-full min-h-[400px]">
              <div className="h-[280px] w-full overflow-hidden relative">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Sub-category badge */}
                <span className="absolute top-2 left-2 bg-btn-primary text-white rounded-full px-3 py-1 text-xs font-bold uppercase shadow z-10">
                  {(blogPosts[0].sub_category || blogPosts[0].subCategory || "").toString()}
                </span>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#767676] text-sm">
                    {blogPosts[0].date}
                  </span>
                  <span className="text-primary text-xs font-bold uppercase">
                    {blogPosts[0].category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#163820] mb-3">
                  {blogPosts[0].title}
                </h3>
                <p className="text-[#767676] text-base mb-4 line-clamp-5">
                  {typeof blogPosts[0].excerpt === "string"
                    ? blogPosts[0].excerpt.replace(/<[^>]+>/g, '').slice(0, 200) + (blogPosts[0].excerpt.length > 200 ? '...' : '')
                    : ""}
                </p>
                {/* <span className="text-[#163820] font-semibold text-base mb-5">
                  {blogPosts[0].author}
                </span> */}
                <Link
                  href={`/blog/${blogPosts[0].id}`}
                  className="mt-auto font-semibold text-btn-primary flex items-center gap-2 hover:underline text-base w-fit"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          {/* Right: Two stacked smaller cards */}
          <div className="flex flex-col gap-10 md:col-span-6">
            {[blogPosts[1], blogPosts[2]].map((post, i) => (
              <div
                key={post.id}
                className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow group flex flex-row min-h-[170px] h-1/2"
                style={{
                  height: "calc((500px) / 2)",
                }}
              >
                <div className="w-2/5 min-w-[160px] max-w-[200px] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ height: "100%" }}
                  />
                  {/* Sub-category badge */}
                  <span className="absolute top-2 left-2 bg-btn-primary text-white rounded-full px-3 py-1 text-xs font-bold uppercase shadow z-10">
                    {(post.sub_category || post.subCategory || "").toString()}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#767676] text-sm">{post.date}</span>
                    <span className="text-primary text-xs font-bold uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#163820] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#767676] text-sm mb-4 line-clamp-4">
                    {typeof post.excerpt === "string"
                      ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 110) + (post.excerpt.length > 110 ? '...' : '')
                      : ""}
                  </p>
                  {/* <span className="text-[#163820] font-semibold text-sm mb-2">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}