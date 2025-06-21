/* eslint-disable @next/next/no-img-element */
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "How to Reduce Plastic Waste",
    excerpt:
      "Discover simple and effective ways to cut down on plastic waste in your daily life. From using reusable bags.",
    image: "/landing-page/plastic.jpg",
    link: "#",
    date: "2025-06-10",
    author: "Jane Doe",
    category: "blog",
    subCategory: "environmental",
  },
  {
    title: "Future of Renewable Energy",
    excerpt:
      "Discover simple and effective ways to cut down on plastic waste in your daily life. From using reusable bags.",
    image: "/landing-page/renewable-energy-project-2.jpg",
    link: "#",
    date: "2025-06-13",
    author: "Michael Lee",
    category: "news",
    subCategory: "renewables",
  },
  {
    title: "Eco-Friendly Gardening",
    excerpt:
      "Discover simple and effective ways to cut down on plastic waste in your daily life. From using reusable bags.",
    image: "/landing-page/eco-friendly-gardening.jpg",
    link: "#",
    date: "2025-06-15",
    author: "Sara Green",
    category: "blog",
    subCategory: "community",
  },
];

export default function BlogSection() {
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
                <Leaf size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Latest Articles
              </span>
            </div>
            <h2
              className="font-bold text-[#163820] text-3xl sm:text-4xl leading-tight"
              style={{
                fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
                letterSpacing: 0,
                lineHeight: 1.18,
              }}
            >
              Recent articles and updates
              <br />
              on{" "}
              <span className="text-primary">
                sustainability & conservation
              </span>
            </h2>
          </div>
          <div className="flex-1 flex justify-end w-full">
            <Button
              size="lg"
              className="bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base px-8 py-3 rounded-lg shadow-lg transition flex items-center gap-2"
              type="button"
            >
              View All Articles <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-12">
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
                <span className="absolute top-2 left-2 bg-[#FFA726] text-white rounded-full px-3 py-1 text-xs font-bold uppercase shadow z-10">
                  {blogPosts[0].subCategory}
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
                <p className="text-[#767676] text-base mb-4">
                  {blogPosts[0].excerpt}
                </p>
                <span className="text-[#163820] font-semibold text-base mb-5">
                  {blogPosts[0].author}
                </span>
                <a
                  href={blogPosts[0].link}
                  className="mt-auto font-semibold text-[#FFA726] flex items-center gap-2 hover:underline text-base w-fit"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          {/* Right: Two stacked smaller cards */}
          <div className="flex flex-col gap-10 md:col-span-6">
            {[blogPosts[1], blogPosts[2]].map((post, i) => (
              <div
                key={i}
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
                  <span className="absolute top-2 left-2 bg-[#FFA726] text-white rounded-full px-3 py-1 text-xs font-bold uppercase shadow z-10">
                    {post.subCategory}
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
                  <p className="text-[#767676] text-sm mb-2">{post.excerpt}</p>
                  <span className="text-[#163820] font-semibold text-sm mb-2">
                    {post.author}
                  </span>
                  <a
                    href={post.link}
                    className="mt-auto font-semibold text-[#FFA726] flex items-center gap-2 hover:underline text-sm w-fit"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
