"use client";
import React from "react";
import { Button } from "./ui/moving-border";

export function MovingBorder({ Label }) {
  return (
    <>
      <Button
        borderRadius="2rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        {Label}
      </Button>
    </>
  );
}
