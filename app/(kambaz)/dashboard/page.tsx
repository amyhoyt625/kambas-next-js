"use client";
import * as enrollmentsClient from "../enrollments/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import * as client from "../courses/client";
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

  const fetchCourses = async () => {
    try {
      if (showAllCourses) {
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses));
      } else {
        const myCourses = await client.findMyCourses();
        dispatch(setCourses(myCourses));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
    } catch (error: any) {
      console.error("Add course error:", error.response?.data || error.message);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) =>
      c._id === course._id ? course : c
    )));
  };

  const handleEnroll = async (courseId: string) => {
    await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
    dispatch(enroll({ userId: currentUser._id, courseId }));
  };

  const handleUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
    dispatch(unenroll({ userId: currentUser._id, courseId }));
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAllCourses]);

  if (!currentUser) return <div>Please sign in to view the dashboard.</div>;

  const isStudent = currentUser.role === "STUDENT";
  const isFaculty = ["FACULTY", "ADMIN", "TA"].includes(currentUser.role);

  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === currentUser._id && e.course === courseId);

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button variant="primary" className="float-end" id="wd-enrollments-btn"
          onClick={() => setShowAllCourses((prev) => !prev)}>
          Enrollments
        </Button>
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button onClick={onAddNewCourse}
              className="btn btn-primary float-end" id="wd-add-new-course-click">
              Add
            </button>
            <button onClick={onUpdateCourse}
              className="btn btn-warning float-end me-2" id="wd-update-course-click">
              Update
            </button>
          </h5>
          <br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/kambaz/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}>
                      {c.description}
                    </CardText>
                    <Button variant="primary" className="me-2">Go</Button>

                    {isStudent && (
                      isEnrolled(c._id) ? (
                        <Button variant="danger" className="float-end" id="wd-unenroll-btn"
                          onClick={(e) => { e.preventDefault(); handleUnenroll(c._id); }}>
                          Unenroll
                        </Button>
                      ) : (
                        <Button variant="success" className="float-end" id="wd-enroll-btn"
                          onClick={(e) => { e.preventDefault(); handleEnroll(c._id); }}>
                          Enroll
                        </Button>
                      )
                    )}

                    {isFaculty && (
                      <>
                        <button className="btn btn-danger"
                          onClick={(e) => { e.preventDefault(); onDeleteCourse(c._id); }}>
                          Delete
                        </button>
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