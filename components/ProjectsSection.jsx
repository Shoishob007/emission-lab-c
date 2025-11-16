/* eslint-disable @next/next/no-img-element */
"use client"
import { ArrowRight, Leaf, LeafIcon, Settings } from "lucide-react";
import Link from "next/link";
import useOffsetStore from "@/stores/offsetStore";
import {renderDescription} from "@/app/offsetPage/components/RenderProjectDetails"
import { useEffect } from "react";


export default function ProjectsSection() {
    const {
    projects, fetchProjects
  } = useOffsetStore();

    useEffect(() => {
      fetchProjects();
    }, [fetchProjects]);

  // console.log("projects :: ", projects)

  return (
    <section
      id="projects"
      className="relative flex justify-center items-center bg-[#0A2D23] py-20 min-h-[700px] px-2 sm:px-4"
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center px-2 sm:px-0">
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center bg-primary/20 rounded-full p-2">
                <LeafIcon size={22} strokeWidth={2} className="text-primary" />
              </span>
              <span className="uppercase text-primary tracking-widest text-xs font-semibold">
                Our Project
              </span>
            </div>
            <h2 className="font-bold text-white text-3xl sm:text-4xl leading-tight mb-4 capitalize">
              Exploring our environmental and
              <br className="hidden sm:block" /> sustainability projects
            </h2>
          </div>
          <Link
            href="/offsetPage"
            className="mt-6 md:mt-0 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition whitespace-nowrap w-fit"
          >
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="w-full flex flex-col md:flex-row md:flex-wrap justify-center gap-10 mb-10">
          {projects.slice(0, 3).map((project, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex-1 min-w-[90vw] max-w-[410px] h-[410px] group cursor-pointer transition-shadow duration-400 mx-auto md:min-w-[340px] md:mx-0"
              style={{
                background: "#18352b",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)",
              }}
            >
              {/* Badge */}
              <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-btn-primary text-white shadow shadow-[#FFA72655] select-none">
                {project.standard}
              </span>

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 max-h-[300px] md:max-h-none"
                style={{ display: "block" }}
                draggable={false}
              />

              {/* Card content */}
              <div className="absolute bottom-0 left-0 p-6 w-full z-20 transition-all duration-400 group-hover:-translate-y-4">
                <div className="mb-4">
                  <div
                    className="font-semibold text-white text-lg"
                    style={{
                      fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
                    }}
                  >
                    {project.name}
                  </div>
                  <div className="text-white/90 text-sm mt-2 line-clamp-2">
                    {renderDescription({project})}
                  </div>
                </div>
                <Link
                  href={`/offsetPage/${project.id}`}
                  className={`
                    inline-flex items-center gap-1 font-semibold text-btn-primary hover:underline text-base
                    opacity-0 translate-y-4
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-400
                  `}
                >
                  View More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-400 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center mt-6">
          <span className="inline-flex items-center gap-2 bg-btn-primary bg-opacity-90 text-white text-sm font-semibold px-3 py-1 rounded-2xl shadow-sm mr-2">
            Free
          </span>
          <span className="text-green-100 text-xs sm:text-sm ">
            Let&apos;s make something great work together.
            <Link
              href="/contact"
              className="ml-1 text-btn-primary font-semibold hover:underline"
            >
              Get Free Quote
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
