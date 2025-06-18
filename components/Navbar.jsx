/* eslint-disable @next/next/no-img-element */
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


const buttonStyles = `
.animated-hover-btn {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #FFA726 0%, #ff9800 100%);
  color: #fff;
  font-weight: 700;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  letter-spacing: 0.01em;
  padding: 0.75rem 1.75rem;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 14px 0px rgba(0,0,0,0.12);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  transition: color 0.2s;
  z-index: 1;
}

.animated-hover-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, #ff9800 0%, #FFA726 100%);
  transition: background-position 0.5s cubic-bezier(0.4,0,0.2,1);
  background-size: 200% 200%;
  background-position: bottom left;
  border-radius: inherit;
  opacity: 1;
}

.animated-hover-btn:hover::before,
.animated-hover-btn:focus-visible::before {
  background-position: top right;
}

.animated-hover-btn > * {
  position: relative;
  z-index: 1;
}
`;


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
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/carbon-logo.png"
              alt="EmissionLab Logo"
              className="h-12 w-auto cursor-pointer"
            />
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
