/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Menu as MenuIcon,
  X,
  Home,
  Briefcase,
  FileCode,
  BookOpen,
  Phone,
  ArrowRight,
  LogOut,
  Info,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/aboutPage", icon: Info },
  { name: "Business", href: "/business", icon: Briefcase },
  { name: "API", href: "/apiPage", icon: FileCode },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Phone },
];

const solutionItems = [
  { name: "Carbon Calculation", href: "/calculator" },
  { name: "Individual Contribution", href: "/offsetPage" },
  // { name: "Commercial Contribution", href: "/offsetPage" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const solutionsCloseTimeout = useRef(null);
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

  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsMobileSolutionsOpen(false);
  };

  const clearSolutionsClose = () => {
    if (solutionsCloseTimeout.current) {
      clearTimeout(solutionsCloseTimeout.current);
      solutionsCloseTimeout.current = null;
    }
  };

  const openSolutions = () => {
    clearSolutionsClose();
    setIsSolutionsOpen(true);
  };

  const scheduleCloseSolutions = () => {
    clearSolutionsClose();
    solutionsCloseTimeout.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 120);
  };

  const isSolutionsActive = solutionItems.some((item) => isActive(item.href));
  const aboutIndex = navItems.findIndex((item) => item.name === "About");
  const primaryNavItems =
    aboutIndex >= 0 ? navItems.slice(0, aboutIndex + 1) : navItems.slice(0, 2);
  const secondaryNavItems =
    aboutIndex >= 0 ? navItems.slice(aboutIndex + 1) : navItems.slice(2);

  return (
    <>
      <nav className="w-full bg-transparent border-b border-border relative z-50">
        <div className="max-w-[1440px] py-4 mx-auto px-4 sm:px-6 bg-transparent">
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
                {primaryNavItems.map((item) => (
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

                <div
                  className="relative"
                  onMouseEnter={openSolutions}
                  onMouseLeave={scheduleCloseSolutions}
                >
                  <button
                    onClick={() =>
                      setIsSolutionsOpen((prev) => {
                        clearSolutionsClose();
                        return !prev;
                      })
                    }
                    onMouseEnter={openSolutions}
                    className={cn(
                      "px-2 py-1 text-base font-semibold transition-colors duration-150 rounded hover:text-primary focus:outline-none flex items-center gap-1",
                      isSolutionsActive ? "text-primary" : "text-black"
                    )}
                    aria-expanded={isSolutionsOpen}
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                      background: "transparent",
                    }}
                  >
                    Our Solutions
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isSolutionsOpen ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "absolute top-full left-0 mt-2 min-w-[240px] bg-white border border-border rounded-xl shadow-xl py-2 z-50 transition-all duration-200 ease-out origin-top",
                      isSolutionsOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                    )}
                    onMouseEnter={openSolutions}
                    onMouseLeave={scheduleCloseSolutions}
                  >
                    {solutionItems.map((solution) => (
                      <Link
                        key={solution.name}
                        href={solution.href}
                        className={cn(
                          "block px-4 py-2 text-sm font-semibold transition-colors",
                          isActive(solution.href)
                            ? "text-primary"
                            : "text-black hover:text-primary"
                        )}
                        onClick={() => setIsSolutionsOpen(false)}
                      >
                        {solution.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {secondaryNavItems.map((item) => (
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
                  Logout <LogOut className="w-5 h-5" />
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
                className="inline-flex items-center justify-center p-2 text-primary focus:outline-none transition-transform duration-300"
                style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                <span className="sr-only">
                  {isOpen ? "Close menu" : "Open menu"}
                </span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[97px] z-40 transition-all duration-300 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-border shadow-lg">
          {primaryNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150",
                isActive(item.href)
                  ? "text-primary"
                  : "text-black hover:text-primary"
              )}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center">{item.name}</div>
            </Link>
          ))}

          <div className="rounded-md">
            <button
              onClick={() => setIsMobileSolutionsOpen((prev) => !prev)}
              className={cn(
                "w-full px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150 flex items-center justify-between",
                isSolutionsActive
                  ? "text-primary"
                  : "text-black hover:text-primary"
              )}
            >
              <span>Our Solutions</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isMobileSolutionsOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </button>

            {isMobileSolutionsOpen && (
              <div className="mt-1 ml-3 border-l border-border pl-3">
                {solutionItems.map((solution) => (
                  <Link
                    key={solution.name}
                    href={solution.href}
                    className={cn(
                      "block px-2 py-2 rounded-md text-sm font-semibold transition-colors duration-150",
                      isActive(solution.href)
                        ? "text-primary"
                        : "text-black hover:text-primary"
                    )}
                    onClick={closeMobileMenu}
                  >
                    {solution.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {secondaryNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-150",
                isActive(item.href)
                  ? "text-primary"
                  : "text-black hover:text-primary"
              )}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center">{item.name}</div>
            </Link>
          ))}

          {/* Start Now / Logout Button */}
          {session?.user ? (
            <button
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
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
              onClick={closeMobileMenu}
            >
              Start Now <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[97px] bottom-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
