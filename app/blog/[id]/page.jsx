/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import { getBlogById } from "@/utils/api/getBlogById";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const data = await getBlogById(id);
        setPost(data);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPost();
  }, [id]);

  if (loading)
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <span className="text-lg text-muted-foreground">Loading...</span>
      </section>
    );

  if (!post)
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <span className="text-lg text-muted-foreground">Post not found.</span>
      </section>
    );

  return (
    <section className="bg-white min-h-[100vh] py-14 px-2">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 font-semibold text-btn-primary hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blogs
        </Link>

        {/* Blog Card */}
        <article className="rounded-3xl overflow-hidden flex flex-col mb-8">
          {/* Image */}
          <div className="relative w-full">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] sm:h-full object-cover object-center"
              style={{ borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem" }}
            />
            {/* Sub-category badge */}
            {post.sub_category || post.subCategory ? (
              <span className="absolute top-4 left-4 bg-btn-primary text-white rounded-full px-4 py-2 text-xs font-bold uppercase shadow z-10">
                {(post.sub_category || post.subCategory || "").toString()}
              </span>
            ) : null}
          </div>

          {/* Main Content */}
          <div className="py-6 px-4 sm:p-10 flex flex-col">
            {/* Date & Category */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-[#767676] text-xs">{post.date}</span>
              <span className="text-[#179C3A] text-xs font-bold uppercase">
                {post.category}
              </span>
            </div>

            {/* Title and Author */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 flex items-center gap-2">
              {post.title}
            </h1>
            <span className="text-[#163820] font-semibold text-sm mb-6 block">
              {post.author}
            </span>

            {/* Blog Content */}
            <div
              className="prose prose-green max-w-none text-[#444] leading-relaxed"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              {typeof post.excerpt === "string" ? parse(post.excerpt) : post.excerpt}
            </div>
          </div>
        </article>
      </div>

      {/* Custom prose styles */}
      <style jsx global>{`
        .prose-green ul > li::marker,
        .prose-green ol > li::marker {
          color: #179c3a;
          font-size: 1.1em;
        }
        .prose-green h2,
        .prose-green h3 {
          color: #179c3a;
          margin-top: 1.5rem;
          margin-bottom: 0.7em;
          font-weight: bold;
        }
        .prose-green strong {
          color: #163820;
          font-weight: 700;
        }
        .prose-green a {
          color: #179c3a;
          text-decoration: underline;
        }
        .prose-green a:hover {
          color: #145c23;
        }
        .prose-green img {
          margin: 1.5rem 0 !important;
          border-radius: 1em;
        }
        /* Add extra gap between all blocks and lists for more breathing room */
        .prose-green p,
        .prose-green ul,
        .prose-green ol,
        .prose-green pre,
        .prose-green blockquote,
        .prose-green h2,
        .prose-green h3,
        .prose-green h4 {
          margin-bottom: 1.4em;
        }
        .prose-green ul,
        .prose-green ol {
          padding-left: 1.35em;
        }
        .prose-green li {
          margin-bottom: 0.5em;
        }
      `}</style>
    </section>
  );
}