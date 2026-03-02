/* eslint-disable @next/next/no-img-element */
import { Leaf, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaLinkedin, FaTwitter, FaX } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const FooterSection = () => {
  return (
    <footer
      className="relative pt-14 pb-6 text-white"
      style={{
        background: "#0A2D23",
      }}
    >
      {/* Background leafy overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
          zIndex: 1,
        }}
      />
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6">
        {/* Top section with logo, partner, address, and email */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start mb-8">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link href={"/"}>
              <img
                src="/carbon-logo.png"
                alt="EmissionLab Logo"
                className="h-12 w-auto cursor-pointer"
              />
            </Link>
            {/* <span className="text-sm text-green-100 mt-2">Emission Lab</span> */}
          </div>

          {/* Partnered With */}
          <div className="flex flex-col items-start">
            <div className="font-bold text-white mb-1">Partnered With</div>
            <div className="flex items-center">
              <img
                src="/partner-logo-1.png"
                alt="Partner Logo"
                className="h-8 w-auto"
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </span>
            <div>
              <div className="font-bold text-white">Address</div>
              <div className="text-green-100 text-sm">Miami, FL 33172</div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </span>
            <div>
              <div className="font-bold text-white">E-Mail</div>
              <div className="text-green-100 text-sm">
                info@aiemissionlab.com
              </div>
            </div>
          </div>
        </div>

        <hr className="border-green-900 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* About */}
          <div>
            <div className="font-bold text-lg mb-4">About Company</div>
            <p className="text-green-100 mb-4 text-sm">
              <span className="font-semibold">Emission Lab</span> is a
              climate-tech initiative born from urgency — and driven by hope.
              Join us on the journey to regenerate the Earth powered by purpose,
              driven by data.
            </p>
          </div>
          {/* Quick Link */}
          <div>
            <div className="font-bold text-lg mb-4">Quick Link</div>
            <ul className="space-y-2 text-green-100 text-sm">
              <li>
                <a href="/" className="hover:text-[#3BBF4A] transition">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/calculator"
                  className="hover:text-[#3BBF4A] transition"
                >
                  Calculators
                </a>
              </li>
              <li>
                <a
                  href="/offsetPage"
                  className="hover:text-[#3BBF4A] transition"
                >
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-[#3BBF4A] transition">
                  Latest Blog
                </a>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <div className="font-bold text-lg mb-4">Services</div>
            <ul className="space-y-2 text-green-100 text-sm">
              <li>
                <a
                  href="/calculatorPage"
                  className="hover:text-[#3BBF4A] transition"
                >
                  Your CO2 Footprint
                </a>
              </li>
              <li>
                <a href="/apiPage" className="hover:text-[#3BBF4A] transition">
                  Api Documentation
                </a>
              </li>
              <li>
                <a
                  href="/offsetPage"
                  className="hover:text-[#3BBF4A] transition "
                >
                  Want to Offset?
                </a>
              </li>
              <li>
                <a href="/business" className="hover:text-[#3BBF4A] transition">
                  Business Scopes
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          {/* <div className="">
            <div className="font-bold text-lg mb-4">Newsletter</div>
            <div className="text-green-100 text-sm mb-2">
              * Sign up now to get daily latest news & update from us.
            </div>
            <form className="flex mt-2 max-w-[360px]">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-green-900 text-green-100 focus:outline-none border border-green-700 placeholder:text-green-300 text-sm"
              />
              <button
                type="submit"
                className="bg-btn-secondary hover:bg-btn-secondary-hover text-green-100 font-semibold px-5 py-2 rounded-r-lg text-sm transition"
              >
                Subscribe
              </button>
            </form>
          </div> */}

          <div className="">
            <div className="font-bold text-lg mb-4">Our Social Platforms</div>
            <div className="text-green-100 text-sm mb-2">
              Join our sustainability community! Follow us for the latest
              updates, carbon reduction tips, and environmental insights.
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/emission-lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center hover:bg-btn-secondary-hover transition text-white"
                title="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61576672107476"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center hover:bg-btn-secondary-hover transition text-white"
                title="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center hover:bg-btn-secondary-hover transition text-white"
                title="X"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-green-800 mb-4" />

        <div className="flex flex-col md:flex-row justify-between items-center text-green-100 text-sm px-1">
          <div className="mb-2 md:mb-0">
            Copyright © 2025 All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-[#3BBF4A] transition">
              Terms & Conditions
            </a>
            {/* <a
              href="/privacy-policy"
              className="hover:text-[#3BBF4A] transition"
            >
              Privacy Policy
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
