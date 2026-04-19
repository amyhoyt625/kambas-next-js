"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { findQuizById, getSubmission, createSubmission } from "../../client";
import { Button } from "react-bootstrap";

export default function QuizAttempt() {
  const { qid, cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // added

  useEffect(() => {
    const load = async () => {
      const quizData = await findQuizById(qid as string);
      setQuiz(quizData);
      const sub = await getSubmission(qid as string, (currentUser as any)._id);
      setSubmission(sub);
    };
    load();
  }, [qid]);

  const questions = quiz?.questions || [];
  const attemptsMade = submission ? submission.attemptNumber : 0;
  const attemptsAllowed = quiz?.multipleAttempts ? quiz.howManyAttempts : 1;
  const hasAttemptsLeft = attemptsMade < attemptsAllowed;

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

    setScore(correct);
    await createSubmission(qid as string, {
      userId: (currentUser as any)._id,
      courseId: cid,
      answers,
      score: correct,
    });
    setSubmitted(true);
  };

  if (!quiz) return <div>Loading...</div>;

  // results
  if (submission && !submitted) {
    return (
      <div className="p-4">
        <h2>{quiz.title} - Last Attempt Results</h2>
        <h4>Score: {submission.score} / {questions.length}</h4>
        <p>Attempts used: {attemptsMade} / {attemptsAllowed}</p>
        <hr />
        {questions.map((q: any, index: number) => {
          const selected = submission.answers[q._id];
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
        {hasAttemptsLeft && (
          <Button variant="danger" onClick={() => setSubmission(null)}>
            Take Again
          </Button>
        )}
      </div>
    );
  }

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
            {q.choices.map((choice: any) => (
              <div key={choice.id} className="mb-1">
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  className="me-2"
                  checked={answers[q._id] === choice.id} // change
                  onChange={() =>
                    setAnswers({ ...answers, [q._id]: choice.id })
                  }
                />
                {choice.text}
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