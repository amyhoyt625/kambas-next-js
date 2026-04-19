//Quiz List Screen aka main screen 

"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, setQuizzes, togglePublish } from "./reducer";
import { RootState } from "../../../store";
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useEffect, useState } from "react";
import * as client from "./client";
import { BsCheckCircle, BsSlashCircle } from "react-icons/bs";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  // get quizzes and current user from Redux
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && ["FACULTY", "ADMIN", "TA"].includes((currentUser as any).role);

  // only show quizzes for this course and filters for student vs. faculty 
  const courseQuizzes = quizzes.filter((q: any) => {
    if (q.course !== cid) return false;
    if (!isFaculty && !q.published) return false;
    return true;
  }).sort((a: any, b: any) => {  // added
    if (!a.availableDate) return 1;
    if (!b.availableDate) return -1;
    return new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime();
  });
  
  // track which quiz's context menu is open
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // fetch quizzes from backend when course changes
  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // create a new quiz with defaults and navigate to its editor
  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuizForCourse(cid as string, {
      title: "Unnamed Quiz",
      course: cid,
      published: false,
    });
    dispatch(setQuizzes([...quizzes, newQuiz]));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  // delete quiz after confirmation
  const handleDeleteQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    }
  };

  // toggle published state both in backend and Redux
  const handleTogglePublish = async (quiz: any) => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    dispatch(togglePublish(quiz._id));
    setOpenMenuId(null);
  };

  // compute availability status string based on current date vs quiz dates
  const getAvailability = (quiz: any) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (available && now < available) {
      return `Not available until ${quiz.availableDate}`;
    } else if (until && now > until) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  return (
    <div id="wd-quizzes">
      {/* search bar and add quiz button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroupText><FaSearch /></InputGroupText>
          <FormControl type="text" placeholder="Search for Quiz" id="wd-search-quiz" />
        </InputGroup>
        {isFaculty && (
          <Button variant="danger" size="lg" id="wd-add-quiz-btn" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>

      {/* quiz list */}
      <ListGroup className="rounded-0" id="wd-quiz-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Assignment Quizzes
            </div>
          </div>

          <ListGroup className="rounded-0">
            {/* empty state message for faculty */}
            {courseQuizzes.length === 0 && isFaculty && (
              <ListGroupItem className="text-center text-muted p-4">
                No quizzes yet. Click <b>+ Quiz</b> to add one.
              </ListGroupItem>
            )}

            {courseQuizzes.map((quiz: any) => (
              <ListGroupItem key={quiz._id}
                className="wd-quiz-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3" />
                  <div>
                    {/* quiz title links to details page */}
                    <Link href={`/courses/${cid}/quizzes/${quiz._id}`}
                      className="wd-quiz-link text-dark text-decoration-none fw-bold">
                      {quiz.title}
                    </Link>
                    {/* availability, due date, points, questions */}
                    <div className="text-muted small mt-1">
                      <span className={
                        getAvailability(quiz) === "Available" ? "text-success" :
                        getAvailability(quiz) === "Closed" ? "text-danger" : ""
                      }>
                        <b>{getAvailability(quiz)}</b>
                      </span>
                      {quiz.dueDate && <> | <b>Due</b> {quiz.dueDate}</>}
                      {" | "}{quiz.points} pts
                      {" | "}{quiz.questions?.length ?? 0} Questions
                    </div>
                  </div>
                </div>

                {/* publish toggle and context menu - faculty only */}
                <div className="d-flex align-items-center gap-3">
                  {isFaculty && (  //wrapped to block students
                  <span style={{ cursor: "pointer", fontSize: "1.2rem" }}
                    onClick={() => handleTogglePublish(quiz)}
                    title={quiz.published ? "Published - click to unpublish" : "Unpublished - click to publish"}>
                    {quiz.published 
                    ? <BsCheckCircle className="text-success fs-5" />
                    : <BsSlashCircle className="text-danger fs-5" />
                  }
                  </span>
                )}

                  {isFaculty && (
                    <div className="position-relative">
                      {/* 3 dots menu button */}
                      <IoEllipsisVertical
                        className="fs-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpenMenuId(openMenuId === quiz._id ? null : quiz._id)}
                      />
                      {/* dropdown context menu */}
                      {openMenuId === quiz._id && (
                        <div className="position-absolute bg-white border rounded shadow"
                          style={{ right: 0, top: "100%", zIndex: 100, minWidth: "140px" }}>
                          <div className="p-2 border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => { router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`); setOpenMenuId(null); }}>
                            Edit
                          </div>
                          <div className="p-2 border-bottom text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => { handleDeleteQuiz(quiz._id); setOpenMenuId(null); }}>
                            Delete
                          </div>
                          <div className="p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleTogglePublish(quiz)}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </div>
                        </div>
                      )}
                    </div>
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