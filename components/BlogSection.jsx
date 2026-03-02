/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { ArrowRight, File, FileText, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBlogs } from "@/utils/api/getBlogs";
import { BlogSkeleton } from "@/components/BlogSkeleton";

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

  // function to get image URL with fallback
  const getImageUrl = (post) => {
    if (!post) return null;

    if (post.image_url) return post.image_url;
    if (post.image) {
      if (post.image.startsWith("http")) return post.image;
      if (post.image.startsWith("/media/")) {
        return `${process.env.NEXT_PUBLIC_API}${post.image}`;
      }
      return post.image;
    }
    return null;
  };

  if (loading) {
    return <BlogSkeleton />;
  }

  if (!blogPosts.length) {
    return (
      <section className="relative py-20 bg-white flex items-center justify-center">
        <span className="text-lg text-muted-foreground">
          No articles found.
        </span>
      </section>
    );
  }

  // console.log("blogPosts :: ", blogPosts)

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
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <FileText size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Latest Articles
              </span>
            </div>
            <h2 className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight capitalize">
              Recent articles and updates <br className="hidden sm:block" />
              on{" "}
              <span className="text-primary">
                sustainability & conservation
              </span>
            </h2>
          </div>
          <div className="flex-1 flex justify-center sm:justify-end w-full">
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
        {/* Mobile: all three as large cards. */}
        <div className="md:hidden flex flex-col gap-8 mt-12">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow group flex flex-col h-full min-h-[400px]"
            >
              <div className="h-[280px] w-full overflow-hidden relative">
                <img
                  src={getImageUrl(post)}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#767676] text-sm">{post.date}</span>
                  {/* <span className="text-primary text-xs font-bold uppercase">
                    {post.category}
                  </span> */}
                </div>
                <h3 className="text-2xl font-bold text-[#163820] mb-3">
                  {post.title}
                </h3>
                <p className="text-[#767676] text-base mb-4 line-clamp-5">
                  {typeof post.excerpt === "string"
                    ? post.excerpt.replace(/<[^>]+>/g, "").slice(0, 180) +
                      (post.excerpt.length > 180 ? "..." : "")
                    : ""}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-auto font-semibold text-btn-secondary flex items-center gap-2 hover:underline text-base w-fit"
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
                  src={getImageUrl(blogPosts[0])}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#767676] text-sm">
                    {blogPosts[0].date}
                  </span>
                  {/* <span className="text-primary text-xs font-bold uppercase">
                    {blogPosts[0].category}
                  </span> */}
                </div>
                <h3 className="text-2xl font-bold text-[#163820] mb-3">
                  {blogPosts[0].title}
                </h3>
                <p className="text-[#767676] text-base mb-4 line-clamp-5">
                  {typeof blogPosts[0].excerpt === "string"
                    ? blogPosts[0].excerpt
                        .replace(/<[^>]+>/g, "")
                        .slice(0, 200) +
                      (blogPosts[0].excerpt.length > 200 ? "..." : "")
                    : ""}
                </p>
                <Link
                  href={`/blog/${blogPosts[0].id}`}
                  className="mt-auto font-semibold text-btn-secondary flex items-center gap-2 hover:underline text-base w-fit"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Two stacked smaller cards - only render if posts exist */}
          <div className="flex flex-col gap-10 md:col-span-6">
            {blogPosts.slice(1, 3).map((post) => (
              <div
                key={post.id}
                className="rounded-3xl overflow-hidden bg-white border border-[#EAEAEA] shadow group flex flex-row min-h-[170px] h-1/2"
                style={{
                  height: "calc((500px) / 2)",
                }}
              >
                <div className="w-2/5 min-w-[160px] max-w-[200px] overflow-hidden relative">
                  <img
                    src={getImageUrl(post)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ height: "100%" }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#767676] text-sm">{post.date}</span>
                    {/* <span className="text-primary text-xs font-bold uppercase">
                      {post.category}
                    </span> */}
                  </div>
                  <h3 className="text-lg font-bold text-[#163820] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#767676] text-sm mb-4 line-clamp-4">
                    {typeof post.excerpt === "string"
                      ? post.excerpt.replace(/<[^>]+>/g, "").slice(0, 110) +
                        (post.excerpt.length > 110 ? "..." : "")
                      : ""}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-auto font-semibold text-btn-secondary flex items-center gap-2 hover:underline text-sm w-fit"
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
