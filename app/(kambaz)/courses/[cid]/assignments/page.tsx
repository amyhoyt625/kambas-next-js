"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import LessonControlButtons from "../modules/LessonControlButtons";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter((a: any) => a.course === cid);

  return (
    <div id="wd-assignments">
      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroupText><FaSearch /></InputGroupText>
          <FormControl type="text" placeholder="Search..." id="wd-search-assignment" />
        </InputGroup>
        <div>
          <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment-btn">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignment List */}
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS 40% of Total
            </div>
            <div>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {assignments.map((assignment: any) => (
              <ListGroupItem key={assignment._id}
                className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3" />
                  <HiOutlinePencilSquare className="me-3 text-success" style={{ marginTop: "5px" }} />
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
                <LessonControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}