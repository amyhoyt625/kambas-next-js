"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import {
  Button, Row, Col, FormLabel, FormControl,
  FormSelect, FormCheck,
} from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const existing = assignments.find((a: any) => a._id === aid);

  const toDateInput = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    const cleaned = dateStr.replace(/ at .+/, "").trim();
    const date = new Date(`${cleaned}, 2024`);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const [assignment, setAssignment] = useState<any>(
    existing ?? {
      title: "New Assignment",
      description: "",
      points: 100,
      due: "",
      availableFrom: "",
      availableUntil: "",
      course: cid,
      modules: "Multiple Modules",
    }
  );

  const handleSave = () => {
    if (existing) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      {/* Assignment Name */}
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" type="text" value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
      </div>

      {/* Description */}
      <div className="mb-3">
        <FormLabel htmlFor="wd-description">Description</FormLabel>
        <FormControl as="textarea" id="wd-description" rows={8}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          placeholder="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify." />
      </div>

      {/* Points */}
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <FormLabel htmlFor="wd-points" className="text-md-end d-block pt-2">Points</FormLabel>
        </Col>
        <Col xs={12} md={8}>
          <FormControl id="wd-points" type="number" value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })} />
        </Col>
      </Row>

      {/* Assignment Group */}
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <FormLabel htmlFor="wd-assignment-group" className="text-md-end d-block pt-2">Assignment Group</FormLabel>
        </Col>
        <Col xs={12} md={8}>
          <FormSelect id="wd-assignment-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="PROJECTS">PROJECTS</option>
          </FormSelect>
        </Col>
      </Row>

      {/* Display Grade as */}
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <FormLabel htmlFor="wd-display-grade-as" className="text-md-end d-block pt-2">Display Grade as</FormLabel>
        </Col>
        <Col xs={12} md={8}>
          <FormSelect id="wd-display-grade-as">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
          </FormSelect>
        </Col>
      </Row>

      {/* Submission Type */}
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <FormLabel className="text-md-end d-block pt-2">Submission Type</FormLabel>
        </Col>
        <Col xs={12} md={8}>
          <div className="border p-3 rounded">
            <FormSelect id="wd-submission-type" className="mb-3">
              <option value="ONLINE">Online</option>
            </FormSelect>
            <FormLabel className="fw-bold mb-2">Online Entry Options</FormLabel>
            <FormCheck type="checkbox" id="wd-chkbox-text"    label="Text Entry"         className="mb-2" />
            <FormCheck type="checkbox" id="wd-chkbox-url"     label="Website URL"        className="mb-2" />
            <FormCheck type="checkbox" id="wd-chkbox-media"   label="Media Recordings"   className="mb-2" />
            <FormCheck type="checkbox" id="wd-chkbox-student" label="Student Annotation" className="mb-2" />
            <FormCheck type="checkbox" id="wd-chkbox-upload"  label="File Uploads" />
          </div>
        </Col>
      </Row>

      {/* Assign */}
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <FormLabel className="text-md-end d-block pt-2">Assign</FormLabel>
        </Col>
        <Col xs={12} md={8}>
          <div className="border p-3 rounded">
            <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign to</FormLabel>
            <FormControl id="wd-assign-to" type="text" defaultValue="Everyone" className="mb-3" />

            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
            <FormControl id="wd-due-date" type="date" className="mb-3"
              value={toDateInput(assignment.due)}
              onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />

            <Row>
              <Col xs={12} md={6}>
                <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                <FormControl id="wd-available-from" type="date"
                  value={toDateInput(assignment.availableFrom)}
                  onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
              </Col>
              <Col xs={12} md={6}>
                <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                <FormControl id="wd-available-until" type="date"
                  value={toDateInput(assignment.availableUntil)}
                  onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Buttons */}
      <hr />
      <Row>
        <Col className="text-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleSave}>Save</Button>
        </Col>
      </Row>
    </div>
  );
}