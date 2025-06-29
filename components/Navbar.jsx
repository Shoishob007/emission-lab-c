/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Menu as MenuIcon,
  X,
  Plane,
  Home,
  Briefcase,
  FileCode,
  BookOpen,
  Phone,
  ArrowRight,
  ChevronDown,
  Info,
  HelpCircle,
  Users,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Calculator", href: "/calculator", icon: Plane },
  { name: "Business", href: "/business", icon: Briefcase },
  { name: "API", href: "/apiSection", icon: FileCode },
  { name: "Blog", href: "/blog", icon: BookOpen },
];

const aboutMenu = [
  {
    name: "Who We Are",
    href: "#about",
    icon: Users,
  },
  {
    name: "What We Do",
    href: "#what-we-do",
    icon: Layers,
  },
  {
    name: "FAQ",
    href: "#faq",
    icon: HelpCircle,
  },
  {
    name: "Contact Us",
    href: "#contact",
    icon: Phone,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (e, id) => {
    e.preventDefault();
    
    // Always navigate to root path with hash
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, null, `/#${id}`);
        }, 50);
      }
    }
  };

  // Maintain scroll position on route changes
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Check if current hash matches menu item
  const isHashActive = (hash) => {
    return typeof window !== 'undefined' && window.location.hash === hash;
  };

  return (
    <nav className="w-full !bg-transparent border-b border-border">
      <div className="max-w-[1440px] py-4 mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/carbon-logo.png"
                alt="EmissionLab Logo"
                className="h-12 w-auto cursor-pointer"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-7">
              {/* Home Link */}
              <Link
                href="/"
                className={cn(
                  "px-2 py-1 text-base font-semibold transition-colors duration-150 rounded hover:text-primary focus:outline-none",
                  isActive("/") ? "text-primary" : "text-black"
                )}
                style={{
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  background: "transparent",
                }}
              >
                <span className="flex items-center gap-1">Home</span>
              </Link>

              {/* About Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "px-2 py-1 text-base font-semibold transition-colors duration-150 rounded hover:text-primary focus:outline-none flex items-center gap-1",
                      aboutMenu.some((m) => isHashActive(m.href))
                        ? "text-primary"
                        : "text-black"
                    )}
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                      background: "transparent",
                    }}
                  >
                    <span className="flex items-center gap-1">
                      About <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={8}
                  className="w-56 rounded-lg shadow-lg border border-border bg-white p-2"
                >
                  {aboutMenu.map((item) => (
                    <DropdownMenuItem
                      asChild
                      key={item.href}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150 hover:bg-primary/10 hover:text-primary cursor-pointer",
                        isHashActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-black"
                      )}
                    >
                      <Link
                        href={`/${item.href}`}
                        onClick={(e) => scrollToSection(e, item.href.split("#")[1])}
                      >
                        <item.icon className="w-5 h-5 mr-2 text-primary" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Other Navigation Items */}
              {navItems.slice(1).map((item) => (
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
                  <span className="flex items-center gap-1">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Donate Now Button */}
          <div className="hidden md:flex">
            <Link
              href="/login"
              className="ml-8 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition"
              style={{
                fontWeight: 700,
                fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              Start Now <ArrowRight className="w-5 h-5" />
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
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              "block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150",
              isActive("/") ? "text-primary" : "text-black hover:text-primary"
            )}
          >
            <div className="flex items-center">Home</div>
          </Link>

          {/* About Dropdown for mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150 hover:text-primary focus:outline-none",
                  aboutMenu.some((m) => isHashActive(m.href))
                    ? "text-primary"
                    : "text-black"
                )}
              >
                About <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 rounded-lg shadow-lg border border-border bg-white p-2"
            >
              {aboutMenu.map((item) => (
                <DropdownMenuItem
                  asChild
                  key={item.href}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150 hover:bg-primary/10 hover:text-primary cursor-pointer",
                    isHashActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-black"
                  )}
                >
                  <Link 
                    href={`/${item.href}`}
                    onClick={(e) => scrollToSection(e, item.href.split("#")[1])}
                  >
                    <item.icon className="w-5 h-5 mr-2 text-primary" />
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Other Navigation Items */}
          {navItems.slice(1).map((item) => (
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
              <div className="flex items-center">{item.name}</div>
            </Link>
          ))}

          <Link
            href="/login"
            className="mt-4 w-full px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition"
            style={{
              fontWeight: 700,
              fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Start Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}