"use client";

import {
  Menu,
  X,
  Plane,
  Home,
  Briefcase,
  FileCode,
  BookOpen,
  Phone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Calculator", href: "/calculator", icon: Plane },
  { name: "Business", href: "/business", icon: Briefcase },
  { name: "API", href: "/apiSection", icon: FileCode },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="w-full bg-white border-b border-border">
      <div className="max-w-[1440px] py-4 mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {/* Logo Icon */}
            <span className="inline-flex items-center justify-center rounded-full bg-[#DDF8DB] p-2">
              {/* Custom leaf/eco icon for logo */}
              <svg width="34" height="34" fill="none" viewBox="0 0 34 34">
                <circle cx="17" cy="17" r="17" fill="#163820" />
                <path
                  d="M24.5 13.5C23.5 17.5 18.5 23.5 10.5 21C16.5 22.5 22.5 18.5 23.5 12.5"
                  stroke="#97d34b"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M13 21C13.5 18.5 15.5 14.5 23 13"
                  stroke="#97d34b"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span
              className="ml-2 text-2xl font-bold tracking-tight text-[#163820]"
              style={{
                fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
              }}
            >
              EmissionLab<span className="text-[#97d34b]">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-7">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-2 py-1 text-base font-semibold transition-colors duration-150 rounded hover:text-primary focus:outline-none",
                    isActive(item.href) ? "text-primary" : "text-black"
                  )}
                  style={{
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    background: "transparent",
                  }}
                >
                  <span className="flex items-center gap-1">
                    {/* {item.icon && <item.icon className="w-4 h-4" />} */}
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Donate Now Button */}
          <div className="hidden md:flex">
            <Link
              href="/donate"
              className="ml-8 px-7 py-3 rounded-lg bg-[#FFA726] hover:bg-[#ff9800] text-white font-bold text-base flex items-center gap-2 shadow-lg transition"
              style={{
                fontWeight: 700,
                fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              Donate Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150",
                isActive(item.href)
                  ? "text-primary"
                  : "text-black hover:text-primary"
              )}
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                {item.name}
              </div>
            </Link>
          ))}
          <Link
            href="/donate"
            className="mt-4 w-full px-7 py-3 rounded-lg bg-[#FFA726] hover:bg-[#ff9800] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition"
            style={{
              fontWeight: 700,
              fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Donate Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
