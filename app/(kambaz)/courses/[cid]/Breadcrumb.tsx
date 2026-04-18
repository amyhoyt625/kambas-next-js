"use client";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const pathname = usePathname();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer); // added
  const segments = pathname.split("/").filter(Boolean); // added

  // get the section name (e.g. "quizzes", "assignments", "modules")
  const sectionIndex = segments.findIndex(s =>
    ["quizzes", "assignments", "modules", "home", "people", "grades"].includes(s)
  ); // added
  const section = sectionIndex !== -1 ? segments[sectionIndex] : segments[segments.length - 1]; // added
  const capitalized = section ? section.charAt(0).toUpperCase() + section.slice(1) : ""; // unchanged

  // check if we're on a quiz detail/edit/preview page and find the quiz name
  const qid = segments[sectionIndex + 1]; // added
  const quiz = quizzes.find((q: any) => q._id === qid); // added

  return (
    <span>
      {course?.name} &gt; {capitalized}
      {quiz && <> &gt; {quiz.title}</>}
    </span>
  );
}