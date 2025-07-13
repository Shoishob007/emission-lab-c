"use client";
import { useEffect } from "react";

export default function FacebookHashFixer() {
  useEffect(() => {
    if (window.location.hash === "#_=_") {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);
  return null;
}