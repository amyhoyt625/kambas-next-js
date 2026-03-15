"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import {
  Row, Col, Card, CardImg, CardBody,
  CardTitle, CardText, Button, FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);

  if (!currentUser) return <div>Please sign in to view the dashboard.</div>;

  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === currentUser._id && e.course === courseId);

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <Button variant="primary" className="float-end" id="wd-enrollments-btn"
          onClick={() => setShowAllCourses((prev) => !prev)}>
          Enrollments
        </Button>
      </h1> <hr />

      {currentUser.role === "FACULTY" && (
        <>
          <h5>New Course
            <Button variant="primary" className="float-end" id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}>Add</Button>
            <Button variant="warning" className="float-end me-2" id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}>Update</Button>
          </h5><br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2> <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={isEnrolled(c._id) ? `/courses/${c._id}/home` : "#"}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => { if (!isEnrolled(c._id)) e.preventDefault(); }}>
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}>
                      {c.description}
                    </CardText>
                    <Button variant="primary" disabled={!isEnrolled(c._id)}>Go</Button>

                    {isEnrolled(c._id) ? (
                      <Button variant="danger" className="float-end ms-2"
                        id="wd-unenroll-btn"
                        onClick={(e) => { e.preventDefault();
                          dispatch(unenroll({ userId: currentUser._id, courseId: c._id })); }}>
                        Unenroll
                      </Button>
                    ) : (
                      <Button variant="success" className="float-end ms-2"
                        id="wd-enroll-btn"
                        onClick={(e) => { e.preventDefault();
                          dispatch(enroll({ userId: currentUser._id, courseId: c._id })); }}>
                        Enroll
                      </Button>
                    )}

                    {currentUser.role === "FACULTY" && (
                      <>
                        <Button variant="danger" className="float-end" id="wd-delete-course-click"
                          onClick={(e) => { e.preventDefault(); dispatch(deleteCourse(c._id)); }}>
                          Delete
                        </Button>
                        <Button variant="warning" className="float-end me-2" id="wd-edit-course-click"
                          onClick={(e) => { e.preventDefault(); setCourse(c); }}>
                          Edit
                        </Button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}