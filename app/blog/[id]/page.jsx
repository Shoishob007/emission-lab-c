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
    if (post.image.startsWith('http')) return post.image;
    if (post.image.startsWith('/media/')) {
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
              style={{ borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem" }}
              onError={(e) => {
                const target = e.target;
                target.src = '/placeholder-blog.jpg';
              }}
            />
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
        .prose-green ul li::marker,
        .prose-green ol li::marker {
          color: #179c3a;
          font-size: 1.1em;
        }

        .prose-green ul li::marker {
          content: "• ";
        }

        .prose-green ol li::marker {
          font-weight: bold;
        }

        .prose-green h1 {
          color: #163820;
          margin-top: 1.5rem;
          margin-bottom: 0.7em;
          font-weight: bold;
        }

        .prose-green h2,
        .prose-green h3 {
          color: #179c3a;
          margin-top: 1.5rem;
          margin-bottom: 0.7em;
          font-weight: bold;
        }

        .prose-green h4 {
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
          width: 100%;
          height: auto;
        }

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
          margin-left: 0;
          list-style-position: outside;
        }

        .prose-green ul {
          list-style-type: disc;
        }

        .prose-green ol {
          list-style-type: decimal;
        }

        .prose-green li {
          margin-bottom: 0.5em;
          padding-left: 0.25em;
          display: list-item;
        }

        /* Handle nested lists */
        .prose-green ul ul,
        .prose-green ol ol,
        .prose-green ul ol,
        .prose-green ol ul {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          padding-left: 1.5em;
        }

        .prose-green ul ul {
          list-style-type: circle;
        }

        .prose-green ul ul ul {
          list-style-type: square;
        }

        .prose-green ol ol {
          list-style-type: lower-alpha;
        }

        .prose-green ol ol ol {
          list-style-type: lower-roman;
        }

        .prose-green ul ol {
          list-style-type: decimal;
        }

        .prose-green ol ul {
          list-style-type: disc;
        }

        .prose-green blockquote {
          border-left: 4px solid #179c3a;
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
          color: #555;
        }

        .prose-green code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
          color: #163820;
        }

        .prose-green pre {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 0.5em;
          padding: 1em;
          overflow-x: auto;
        }

        .prose-green table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }

        .prose-green th,
        .prose-green td {
          border: 1px solid #e9ecef;
          padding: 0.5em;
          text-align: left;
        }

        .prose-green th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #163820;
        }
      `}</style>
    </section>
  );
}