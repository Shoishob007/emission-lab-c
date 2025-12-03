/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import { getBlogById } from "@/utils/api/getBlogById";

const getImageUrl = (post) => {
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

  const parsedExcerpt = parse(post.excerpt, {
    replace: (domNode) => {
      if (domNode.name === "a" && domNode.attribs?.href) {
        let href = domNode.attribs.href;

        // Clean URL ONLY inside href attribute
        href = href
          .replace(/\\+"/g, "")
          .replace(/%22/g, "")
          .replace(/^"(.*)"$/, "$1")
          .replace(/“|”/g, "");

        // Auto-prepend https:// if missing
        if (!href.startsWith("http")) {
          href = "https://" + href.replace(/^\/+/, "");
        }

        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            {domNode.children?.map((child) => child.data).join("")}
          </a>
        );
      }
    },
  });

  return (
    <section className="bg-white min-h-[100vh] py-14 px-2">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
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
              src={getImageUrl(post)}
              alt={post.title}
              className="w-full h-[400px] sm:h-full object-cover object-center"
              style={{
                borderTopLeftRadius: "1.5rem",
                borderTopRightRadius: "1.5rem",
              }}
              onError={(e) => {
                e.target.src = "/placeholder-blog.jpg";
              }}
            />
          </div>

          {/* Main Content */}
          <div className="py-6 px-4 sm:p-10 flex flex-col">
            {/* Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-[#767676] text-xs">{post.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#163820] mb-2 flex items-center gap-2">
              {post.title}
            </h1>

            {/* Blog Excerpt */}
            <div
              className="prose prose-green max-w-none text-[#444] leading-relaxed"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              {parsedExcerpt}
            </div>
          </div>
        </article>
      </div>

      {/* Custom prose styling */}
      <style jsx global>{`
        .prose-green ul > li::marker,
        .prose-green ol > li::marker {
          color: #179c3a;
          font-size: 1.1em;
        }
        .prose-green strong {
          color: #163820;
        }
        .prose-green a {
          color: #179c3a;
          text-decoration: underline;
        }
        .prose-green a:hover {
          color: #145c23;
        }
      `}</style>
    </section>
  );
}