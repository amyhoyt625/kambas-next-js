//This is the details page so users can see description/attributes of the quiz

"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../../store";
import { setQuizzes } from "../reducer";
import * as client from "../client";
import { Button, Row, Col } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { togglePublish } from "../reducer";


export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  //access quizzes and current user 
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && ["FACULTY", "ADMIN", "TA"].includes((currentUser as any).role);

  // fetch quizzes if store is empty 
  useEffect(() => {
    if (quizzes.length === 0) {
      client.findQuizzesForCourse(cid as string).then((data) => dispatch(setQuizzes(data)));
    }
  }, []);

  //find the specific quiz by ID
  const quiz = quizzes.find((q: any) => q._id === qid);

  if (!quiz) return <div className="p-4">Loading...</div>;

  // helper to display boolean fields as Yes/No
  const yesNo = (val: boolean) => val ? "Yes" : "No";

  //Buttons
  return (
    <div id="wd-quiz-details" className="p-4">

      {/* Publish/Unpublish, Preview and Edit buttons for faculty */}
      {isFaculty && (
        <div className="d-flex justify-content-end mb-4 gap-2">
          <Button
            variant={quiz.published ? "danger" : "success"}
            onClick={async () => {
              if (quiz.published) {
                await client.unpublishQuiz(quiz._id);
              } else {
                await client.publishQuiz(quiz._id);
              }
              //update Redux state immediately to show button works
              dispatch(togglePublish(quiz._id));
            }}>
            {quiz.published ? "Unpublish" : "Publish"} 
          </Button>
          <Button variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
            Preview
          </Button>
          <Button variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
            <FaPencil/> Edit
          </Button>
        </div>
      )}

      <h2>{quiz.title}</h2>

      {/* Start Quiz button for students */}
      {!isFaculty && (
        <Button variant="danger" className="mb-4"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/attempt`)}>
          Start Quiz
        </Button>
      )}

      {/* Quiz properties table */}
      <table className="table table-borderless mt-3">
        <tbody>
          <tr>
            <td className="fw-bold text-end" style={{ width: "40%" }}>Quiz Type</td>
            <td>{quiz.quizType?.replace("_", " ")}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Shuffle Answers</td>
            <td>{yesNo(quiz.shuffleAnswers)}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Time Limit</td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Multiple Attempts</td>
            <td>{yesNo(quiz.multipleAttempts)}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className="fw-bold text-end">How Many Attempts</td>
              <td>{quiz.howManyAttempts}</td>
            </tr>
          )}
          <tr>
            <td className="fw-bold text-end">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Access Code</td>
            <td>{quiz.accessCode || "None"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">One Question at a Time</td>
            <td>{yesNo(quiz.oneQuestionAtATime)}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Webcam Required</td>
            <td>{yesNo(quiz.webcamRequired)}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Lock Questions After Answering</td>
            <td>{yesNo(quiz.lockQuestionsAfterAnswering)}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Due Date</td>
            <td>{quiz.dueDate || "None"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Available Date</td>
            <td>{quiz.availableDate || "None"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Until Date</td>
            <td>{quiz.untilDate || "None"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}