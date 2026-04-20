//This is page that students see instead of preview (which is for faculty)
//handles student interaction, score, and submissions for quizzes and displays UI



"use client"; // ensure runs on client side
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { findQuizById, getSubmission, createSubmission } from "../../client"; //api functions to fetch quiz data and handle student submissions
import { Button } from "react-bootstrap";

export default function QuizAttempt() {
  const { qid, cid } = useParams();
  const router = useRouter();

  // get the currently logged-in user from Redux store (holds state of app, alerts components when state changes so UI can rerender)
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  //local state to store data
  const [quiz, setQuiz] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // added

  //fetch quiz and prev submission when loads
  useEffect(() => {
    const load = async () => {
      const quizData = await findQuizById(qid as string);
      setQuiz(quizData);

      //get student's prev submission if have
      const sub = await getSubmission(qid as string, (currentUser as any)._id);
      setSubmission(sub);
    };
    load();
  }, [qid]);

  //tracker values 
  const questions = quiz?.questions || []; //fall back on empty (error catch)
  const attemptsMade = submission ? submission.attemptNumber : 0;
  const attemptsAllowed = quiz?.multipleAttempts ? quiz.howManyAttempts : 1;
  const hasAttemptsLeft = attemptsMade < attemptsAllowed;

  //submission handler
  const handleSubmit = async () => {
    let correct = 0;
    questions.forEach((q: any) => {
      const selected = answers[q._id];
      if (q.type === "MULTIPLE_CHOICE") {
        const correctChoice = q.choices.find((c: any) => c.isCorrect);
        if (correctChoice && selected === correctChoice.id) correct++;
      }
      if (q.type === "TRUE_FALSE") {
        if (selected === q.correctAnswer) correct++;
      }
      if (q.type === "FILL_IN_BLANK") {
        if (q.answers.includes(selected)) correct++;
      }
    });

    //save score locally 
    setScore(correct);

    //send submissions to backend
    await createSubmission(qid as string, {
      userId: (currentUser as any)._id,
      courseId: cid,
      answers,
      score: correct,
    });

    //mark as submitted and switches to results view UI
    setSubmitted(true);
  };

  if (!quiz) return <div>Loading...</div>;

  //show prev results
  if (submission && !submitted) {
    return (
      <div className="p-4">
        <h2>{quiz.title} - Last Attempt Results</h2>
        <h4>Score: {submission.score} / {questions.length}</h4>
        <p>Attempts used: {attemptsMade} / {attemptsAllowed}</p>
        <hr />
        {/* go through questions and show correctness */}
        {questions.map((q: any, index: number) => {
          const selected = submission.answers[q._id];
          let isCorrect = false;

          //check correctness based on question type
          if (q.type === "MULTIPLE_CHOICE") {
            //find the choice object in the list that is marked as correct
            const correctChoice = q.choices.find((c: any) => c.isCorrect);
            //set isCorrect to true only if a correct choice exists AND the user's selected answer matches its ID
            isCorrect = correctChoice && selected === correctChoice.id;
          }
          if (q.type === "TRUE_FALSE") isCorrect = selected === q.correctAnswer;
          if (q.type === "FILL_IN_BLANK") isCorrect = q.answers.includes(selected);

          return (
            <div key={q._id} className={`border rounded p-3 mb-3 ${isCorrect ? "border-success" : "border-danger"}`}>
              <div className="d-flex justify-content-between">
                <b>Question {index + 1}</b>
                <span>{isCorrect ? "Correct" : "Wrong"}</span>
              </div>
              <p className="mt-2">{q.question}</p>
            </div>
          );
        })}

        {/* handle retakes */}
        {hasAttemptsLeft && (
          <Button variant="danger" onClick={() => setSubmission(null)}>
            Take Again
          </Button>
        )}
      </div>
    );
  }

  //show current results after submit
  if (submitted) {
    return (
      <div className="p-4">
        <h2>{quiz.title} - Results</h2>
        <h4>Score: {score} / {questions.length}</h4>
        <p>Attempts used: {attemptsMade + 1} / {attemptsAllowed}</p>
        <hr />
        {questions.map((q: any, index: number) => {
          const selected = answers[q._id];
          let isCorrect = false;
          if (q.type === "MULTIPLE_CHOICE") {
            const correctChoice = q.choices.find((c: any) => c.isCorrect);
            isCorrect = correctChoice && selected === correctChoice.id;
          }
          if (q.type === "TRUE_FALSE") isCorrect = selected === q.correctAnswer;
          if (q.type === "FILL_IN_BLANK") isCorrect = q.answers.includes(selected);

          return (
            <div key={q._id} className={`border rounded p-3 mb-3 ${isCorrect ? "border-success" : "border-danger"}`}>
              <div className="d-flex justify-content-between">
                <b>Question {index + 1}</b>
                <span>{isCorrect ? "Correct" : "Wrong"}</span>
              </div>
              <p className="mt-2">{q.question}</p>
            </div>
          );
        })}
      </div>
    );
  }

  const q = questions[currentIndex]; //single question

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <hr />

      {/* show 1 question */}
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between">
          <b>Question {currentIndex + 1}</b>
          <span>{q.points} pts</span>
        </div>
        <p className="mt-2">{q.question}</p>

        {/* Multiple Choice */}
        {q.type === "MULTIPLE_CHOICE" && (
        <div className="mt-2"> 
          {/* loop through each choice and render a radio button */}
          {q.choices.map((choice: any) => (
            <div key={choice.id} className="mb-1"> 
              <input
                type="radio" 
                name={`question-${q._id}`} // groups options so only one can be selected per question
                className="me-2" // adds spacing to the right of the input
                checked={answers[q._id] === choice.id} // checks if this choice is currently selected
                onChange={() =>
                  setAnswers({ ...answers, [q._id]: choice.id }) // update state with selected answer
                }/>
              {choice.text} {/* display the text of the choice */}
            </div>
          ))}

        </div>
      )}

        {/* True/False */}
        {q.type === "TRUE_FALSE" && (
          <div className="mt-2">
            <div className="mb-1">
              <input
                type="radio"
                name={`question-${q._id}`}
                className="me-2"
                checked={answers[q._id] === true} //change
                onChange={() =>
                  setAnswers({ ...answers, [q._id]: true })
                }
              />
              True
            </div>
            <div className="mb-1">
              <input
                type="radio"
                name={`question-${q._id}`}
                className="me-2"
                checked={answers[q._id] === false} // change
                onChange={() =>
                  setAnswers({ ...answers, [q._id]: false })
                }
              />
              False
            </div>
          </div>
        )}

        {/* Fill in the Blank */}
        {q.type === "FILL_IN_BLANK" && (
          <div className="mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Your answer..."
              value={answers[q._id] || ""} // change
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [q._id]: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>

      {/* navigation */}
      <div className="d-flex justify-content-between mt-3">
        <Button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          Previous
        </Button>

        <Button
          disabled={currentIndex === questions.length - 1}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          Next
        </Button>
      </div>

      {/* jump buttons */}
      <div className="mt-3">
        {questions.map((_: any, i: number) => (
          <Button
            key={i}
            size="sm"
            className="me-2"
            variant={i === currentIndex ? "primary" : "outline-secondary"}
            onClick={() => setCurrentIndex(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>

      <Button className="mt-4" variant="danger" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </div>
  );
}