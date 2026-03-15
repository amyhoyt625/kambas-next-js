
"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const pathname = usePathname();
  const section = pathname.split("/").pop();
  const capitalized = section ? section.charAt(0).toUpperCase() + section.slice(1) : "";

  return (
    <span>
      {course?.name} &gt; {capitalized}
    </span>
  );
}