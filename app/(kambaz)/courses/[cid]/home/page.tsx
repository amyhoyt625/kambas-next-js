"use client"
import Modules from "../modules/page";
import CourseStatus from "./Status";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Home() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && ["FACULTY", "ADMIN", "TA"].includes((currentUser as any).role);

  return (
    <div id="wd-home">
      <div className="d-flex">
        <div className="flex-fill me-3">
          <Modules />
        </div>
        {isFaculty && (
          <div className="d-none d-xl-block">
            <CourseStatus />
          </div>
        )}
      </div>
    </div>
  );
}