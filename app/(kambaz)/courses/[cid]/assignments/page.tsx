"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { RootState } from "../../../store";
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import LessonControlButtons from "../modules/LessonControlButtons";
import { useEffect } from "react";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const courseAssignments = assignments.filter((a: any) => a.course === cid);
  const isFaculty = currentUser && ["FACULTY", "ADMIN", "TA"].includes((currentUser as any).role);

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    console.log("fetched assignments:", assignments);
    dispatch(setAssignments(assignments));
  };

  const onDeleteAssignment = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroupText><FaSearch /></InputGroupText>
          <FormControl type="text" placeholder="Search..." id="wd-search-assignment" />
        </InputGroup>
        <div>
          {isFaculty && (
            <>
              <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
                <FaPlus className="me-1" /> Group
              </Button>
              <Link href={`/courses/${cid}/assignments/new`}>
                <Button variant="danger" size="lg" id="wd-add-assignment-btn">
                  <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                  Assignment
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS 40% of Total
            </div>
            {isFaculty && (
              <div>
                <FaPlus className="me-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            )}
          </div>

          <ListGroup className="rounded-0">
            {courseAssignments.map((assignment: any) => (
              <ListGroupItem key={assignment._id}
                className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3" />
                  {isFaculty && (
                    <HiOutlinePencilSquare className="me-3 text-success" style={{ marginTop: "5px" }} />
                  )}
                  <div>
                    <Link href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="wd-assignment-link text-dark text-decoration-none fw-bold">
                      {assignment.title}
                    </Link>
                    <div className="wd-assignment-meta text-muted small">
                      <span className="text-danger">{assignment.modules}</span> |{" "}
                      <b>Not available until</b> {assignment.availableFrom} |
                      <br />
                      <b>Due</b> {assignment.due} | {assignment.points} pts
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <LessonControlButtons />
                  {isFaculty && (
                    <FaTrash className="text-danger" style={{ cursor: "pointer" }}
                      onClick={() => onDeleteAssignment(assignment._id)} />
                  )}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}