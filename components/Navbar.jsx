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
  LogOut,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/aboutPage", icon: Info },
  { name: "Calculator", href: "/calculator", icon: Plane },
  { name: "Business", href: "/business", icon: Briefcase },
  { name: "API", href: "/apiPage", icon: FileCode },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path) && path !== "/";
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/users/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            refresh: session?.refreshToken,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      await signOut({ redirect: false });
      router.push("/");
    }
  };

  return (
    <nav className="w-full !bg-transparent border-b border-border">
      <div className="max-w-[1440px] py-4 mx-auto px-4 sm:px-6">
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
            <div className="flex items-center space-x-6 sm:space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-2 py-1 text-base font-semibold transition-colors duration-150 rounded hover:text-primary focus:outline-none flex items-center gap-1",
                    isActive(item.href) ? "text-primary" : "text-black"
                  )}
                  style={{
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    background: "transparent",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Start Now / Logout Button - Desktop */}
          <div className="hidden md:flex">
            {session?.user ? (
              <button
                onClick={handleLogout}
                className="ml-8 px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition"
                style={{
                  fontWeight: 700,
                  fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                Logout Now <LogOut className="w-5 h-5" />
              </button>
            ) : (
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
            )}
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
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">{item.name}</div>
            </Link>
          ))}

          {/* Start Now / Logout Button - Mobile */}
          {session?.user ? (
            <button
              onClick={handleLogout}
              className="mt-4 w-full px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition"
              style={{
                fontWeight: 700,
                fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              Logout <span className="block sm:hidden xl:block">Now</span>{" "}
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href="/login"
              className="mt-4 w-full px-7 py-3 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition"
              style={{
                fontWeight: 700,
                fontFamily: "'Montserrat', Arial, Helvetica, sans-serif",
                letterSpacing: "0.01em",
              }}
              onClick={() => setIsOpen(false)}
            >
              Start Now <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
