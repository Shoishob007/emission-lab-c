/* eslint-disable @next/next/no-img-element */
import { Leaf, MapPin, Phone, Mail } from "lucide-react";
import { FaPinterestP, FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";

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
          opacity: 0.12,
          zIndex: 1,
        }}
      />
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6">
        {/* Top bar with logo and contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center mb-8">
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/carbon-logo.png"
              alt="EmissionLab Logo"
              className="h-12 w-auto cursor-pointer"
            />
          </div>
          {/* Address */}
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </span>
            <div>
              <div className="font-bold text-white">Address</div>
              <div className="text-green-100 text-sm">
                4517 Washington Manchester
              </div>
            </div>
          </div>
          {/* Contact */}
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </span>
            <div>
              <div className="font-bold text-white">Contact</div>
              <div className="text-green-100 text-sm">+(91) - 123 456 789</div>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </span>
            <div>
              <div className="font-bold text-white">E-Mail</div>
              <div className="text-green-100 text-sm">info@elab.com</div>
            </div>
          </div>
        </div>

        <hr className="border-green-900 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* About */}
          <div>
            <div className="font-bold text-lg mb-4">About Company</div>
            <p className="text-green-100 mb-4 text-sm">
              Join us in making a lasting impact on our planet. Together, we can
              protect nature, reduce our carbon footprint.
            </p>
            <div className="flex gap-3">
      <a
        href="#"
        className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center hover:bg-btn-secondary-hover transition text-white"
        title="X"
      >
        <FaXTwitter className="w-4 h-4" />
      </a>
      <a
        href="#"
        className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center hover:bg-btn-secondary-hover transition text-white"
        title="Facebook"
      >
        <FaFacebookF className="w-4 h-4" />
      </a>
      <a
        href="#"
        className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center hover:bg-btn-secondary-hover transition text-white"
        title="Instagram"
      >
        <FaInstagram className="w-4 h-4" />
      </a>
    </div>
          </div>
          {/* Quick Link */}
          <div>
            <div className="font-bold text-lg mb-4">Quick Link</div>
            <ul className="space-y-2 text-green-100 text-sm">
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
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
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Energy Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Water Conservation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Waste Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Biodiversity Protection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3BBF4A] transition">
                  Green Technology
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div className="md:col-span-2">
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
          </div>
        </div>

        <hr className="border-green-800 mb-4" />

        <div className="flex flex-col md:flex-row justify-between items-center text-green-100 text-sm px-1">
          <div className="mb-2 md:mb-0">
            Copyright © 2025 All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#3BBF4A] transition">
              Terms & Condition
            </a>
            <a href="#" className="hover:text-[#3BBF4A] transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
