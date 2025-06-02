'use client';

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Routes where navbar should be hidden
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  // Don't render navbar on auth pages
  if (shouldHideNavbar) {
    return null;
  }

  return <Navbar />;
}