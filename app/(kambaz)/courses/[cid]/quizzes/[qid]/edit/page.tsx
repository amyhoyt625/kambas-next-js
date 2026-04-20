//This is page for Faculty to edit quizzes (can edit both details and questions)

"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateQuiz, addQuiz } from "../../reducer"; //Redux actions to send data from user interactions
import { RootState } from "../../../../../store";
import * as client from "../../client"; //API calls
import QuestionEditor from "../../QuestionEditor";
import {
  Button, Row, Col, FormLabel, FormControl,
  FormSelect, FormCheck, Nav, NavItem, NavLink,
} from "react-bootstrap";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && ["FACULTY", "ADMIN", "TA"].includes((currentUser as any).role);

  // redirect students away from editor
  if (!isFaculty) {
    router.push(`/courses/${cid}/quizzes`);
    return null;
  }

  //try to find existing quiz in Redux store
  const existing = quizzes.find((q: any) => q._id === qid);

  //local state for quiz being edited
  const [quiz, setQuiz] = useState<any>(
    existing ?? {
      title: "Unnamed Quiz",
      description: "",
      quizType: "GRADED_QUIZ",
      points: 0,
      assignmentGroup: "QUIZZES",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "immediately",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      published: false,
      course: cid,
      questions: [],
    }
  );

  // which tab is active: "details" or "questions"
  const [activeTab, setActiveTab] = useState("details");

  const handleSave = async () => {
    if (existing) {
      //update existing quiz
      await client.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
    } else {
      //create new quiz
      const newQuiz = await client.createQuizForCourse(cid as string, quiz);
      dispatch(addQuiz(newQuiz));
    }
    //nav to quiz details page
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    //same as saved but forces published to be true
    const publishedQuiz = { ...quiz, published: true };
    if (existing) {
      await client.updateQuiz(publishedQuiz);
      dispatch(updateQuiz(publishedQuiz));
    } else {
      const newQuiz = await client.createQuizForCourse(cid as string, publishedQuiz);
      dispatch(addQuiz(newQuiz));
    }
    //go pack to quizzes list page
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    //discard changes
    router.push(`/courses/${cid}/quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="p-4">
      {/* Details / Questions tabs */}
      <Nav variant="tabs" className="mb-3">
        <NavItem>
          <NavLink active={activeTab === "details"}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("details")}>
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "questions"}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("questions")}>
            Questions
          </NavLink>
        </NavItem>
      </Nav>

      {/* Details tab */}
      {activeTab === "details" && (
        <div>
        {/*quiz title */}
      <div className="mb-3">
        <FormControl id="wd-name" type="text" value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
      </div>

          {/* description */}
          <div className="mb-3">
            <FormLabel>Quiz Instructions</FormLabel>
            <FormControl as="textarea" rows={5}
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
          </div>

          {/* quiz Type */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <FormLabel className="text-md-end d-block pt-2">Quiz Type</FormLabel>
            </Col>
            <Col xs={12} md={8}>
              <FormSelect value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Row>

          {/* points */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <FormLabel className="text-md-end d-block pt-2">Points</FormLabel>
            </Col>
            <Col xs={12} md={8}>
              <FormControl type="number" value={quiz.points}
                onChange={(e) => setQuiz({ ...quiz, points: Number(e.target.value) })} />
            </Col>
          </Row>

          {/* Assignment Group */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <FormLabel className="text-md-end d-block pt-2">Assignment Group</FormLabel>
            </Col>
            <Col xs={12} md={8}>
              <FormSelect value={quiz.assignmentGroup}
                onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </FormSelect>
            </Col>
          </Row>

          {/* Options */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <FormLabel className="text-md-end d-block pt-2">Options</FormLabel>
            </Col>
            <Col xs={12} md={8}>
              <div className="border p-3 rounded">
                {/* shuffle toggle */}
                <FormCheck type="checkbox" label="Shuffle Answers" className="mb-2"
                  checked={quiz.shuffleAnswers}
                  onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
                {/* time limit toggle & conditional input */}
                <FormCheck type="checkbox" label="Time Limit" className="mb-2"
                  checked={quiz.timeLimit > 0}
                  onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })} />
                {/* only show input if enabled */}
                {quiz.timeLimit > 0 && (
                  <FormControl type="number" className="mb-2" value={quiz.timeLimit}
                    onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })} />
                )}
                <FormCheck type="checkbox" label="Allow Multiple Attempts" className="mb-2"
                  checked={quiz.multipleAttempts}
                  onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} />
                {/* show how many attempts input only if multiple attempts is checked */}
                {quiz.multipleAttempts && (
                  <Row className="mb-2">
                    <Col xs={6}>
                      <FormLabel>How Many Attempts</FormLabel>
                    </Col>
                    <Col xs={6}>
                      <FormControl type="number" value={quiz.howManyAttempts}
                        onChange={(e) => setQuiz({ ...quiz, howManyAttempts: Number(e.target.value) })} />
                    </Col>
                  </Row>
                )}

              <Row className="mb-2">
                <Col xs={6}>
                  <FormLabel>Show Correct Answers</FormLabel>
                </Col>
                <Col xs={6}>
                {/* dropdown example */}
                  <FormSelect value={quiz.showCorrectAnswers}
                    onChange={(e) =>        // fires every time the user picks a new option
                      setQuiz({            // calls setQuiz to update the quiz state
                        ...quiz,           // copies all existing quiz fields (title, points, dueDate, etc.)
                        showCorrectAnswers: e.target.value  // overwrites just this one field with the new selected value
                      })
                    }>
                    <option value="immediately">Immediately</option>
                    <option value="never">Never</option>
                    <option value="after_due">After Due Date</option>
                  </FormSelect>
                </Col>
              </Row>


                <FormCheck type="checkbox" label="Access Code" className="mb-2"
                  checked={quiz.accessCode !== ""}
                  onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.checked ? " " : "" })} />
                {quiz.accessCode !== "" && (
                  <FormControl type="text" placeholder="Enter access code" className="mb-2"
                    value={quiz.accessCode.trim()}
                    onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
                )}

                <FormCheck type="checkbox" label="One Question at a Time" className="mb-2"
                  checked={quiz.oneQuestionAtATime}
                  onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} />
                <FormCheck type="checkbox" label="Webcam Required" className="mb-2"
                  checked={quiz.webcamRequired}
                  onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />
                <FormCheck type="checkbox" label="Lock Questions After Answering"
                  checked={quiz.lockQuestionsAfterAnswering}
                  onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })} />
              </div>
            </Col>
          </Row>

          {/* Assign dates */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <FormLabel className="text-md-end d-block pt-2">Assign</FormLabel>
            </Col>
            <Col xs={12} md={8}>
              <div className="border p-3 rounded">
                <FormLabel className="fw-bold">Due</FormLabel>
                <FormControl type="date" className="mb-3" value={quiz.dueDate}
                  onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
                <Row>
                  <Col xs={12} md={6}>
                    <FormLabel className="fw-bold">Available from</FormLabel>
                    <FormControl type="date" value={quiz.availableDate}
                      onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })} />
                  </Col>
                  <Col xs={12} md={6}>
                    <FormLabel className="fw-bold">Until</FormLabel>
                    <FormControl type="date" value={quiz.untilDate}
                      onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      )}

      {/* Questions tab*/}
      {activeTab === "questions" && (
  <QuestionEditor
    questions={quiz.questions || []}
    onChange={(questions) => setQuiz({ ...quiz, questions })}
  />
)}

      {/* Save / Cancel buttons */}
      <hr />
      <Row>
        <Col className="text-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>Cancel</Button>
          <Button variant="secondary" className="me-2" onClick={handleSaveAndPublish}>Save & Publish</Button>
          <Button variant="danger" onClick={handleSave}>Save</Button>
        </Col>
      </Row>
    </div>
  );
}