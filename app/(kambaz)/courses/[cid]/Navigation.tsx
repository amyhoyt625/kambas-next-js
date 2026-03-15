"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = link === "People"
          ? `/courses/${cid}/people/Table`
          : `/courses/${cid}/${link.toLowerCase()}`;
        const isActive = pathname.includes(link.toLowerCase());
        return (
          <Link
            key={link}
            href={path}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}