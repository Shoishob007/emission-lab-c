/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function WiseAdviceSection() {
  return (
    <section
      className="relative w-full flex flex-col lg:flex-row items-stretch justify-center bg-[#FAF9F7] py-20 px-4 md:px-0"
      style={{
        minHeight: "520px",
      }}
    >
      {/* Quote Area (left) */}
      <div className="w-full lg:w-1/2 max-w-[520px] min-w-[300px] p-4 flex flex-col justify-center">
        <blockquote className="relative pl-0 md:pl-6">
          {/* Quotation mark */}
          <span className="absolute left-0 top-0 text-primary text-5xl font-serif opacity-70 -ml-2 select-none hidden md:block">
            &ldquo;
          </span>
          <div className="text-[#767676] text-base sm:text-lg font-normal leading-relaxed z-10 relative">
            <p className="mb-4">
              In a world facing climate urgency, every choice matters. True change begins when we refuse to be bystanders and use our knowledge, innovation, and compassion to make a difference.
            </p>
            <p>
              Let’s be the generation that takes action and inspires hope—for ourselves, our communities, and our planet’s future.
            </p>
          </div>
          <footer className="text-[#163820] text-base mt-4 font-bold">
            — Emission Lab
          </footer>
        </blockquote>
      </div>

      {/* Images Grid (right) */}
      <div className="w-full lg:w-1/2 max-w-[600px] min-w-[320px] p-4 flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-4 sm:gap-7 w-full">
          {/* Left column */}
          <div className="flex flex-col gap-4 sm:gap-7">
            <div className="rounded-2xl overflow-hidden aspect-square w-full min-w-0 max-w-[250px] mx-auto">
              <img
                src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751644265/emisison-lab/markus-spiske-dYZumbs8f_E-unsplash_sbzkag.jpg"
                alt="Sustainable Solutions"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square w-full min-w-0 max-w-[250px] mx-auto">
              <img
                src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751644474/emisison-lab/2149571859_1_hbsdi0.jpg"
                alt="Sustainable Solutions"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* Right column */}
          <div
            className="
              rounded-2xl overflow-hidden
              aspect-square w-full min-w-0 max-w-[320px] mx-auto
              sm:aspect-auto sm:max-w-[250px] sm:max-h-[528px] sm:h-full
            "
          >
            <img
              src="https://res.cloudinary.com/dmazsiqdy/image/upload/v1751644265/emisison-lab/2148971013_dgl7oj.jpg"
              alt="Sustainable Solutions"
              className="w-full h-full object-cover"
              draggable={false}
              style={{
                minHeight: 0,
                maxHeight: "528px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}