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

  // phase 1: student has a previous submission - show results
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

// phase 2: just submitted - show new results
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
              <span>{isCorrect ? "✅ Correct" : "❌ Wrong"}</span>
            </div>
            <p className="mt-2">{q.question}</p>
          </div>
        );
      })}
    </div>
  );
}

// phase 3: taking the quiz
return (
  <div className="p-4">
    <h2>{quiz.title}</h2>
    <p>{quiz.description}</p>
    <hr />
    {questions.map((q: any, index: number) => (
      <div key={q._id} className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between">
          <b>Question {index + 1}</b>
          <span>{q.points} pts</span>
        </div>
        <p className="mt-2">{q.question}</p>

        {q.type === "MULTIPLE_CHOICE" && (
          <div className="mt-2">
            {q.choices.map((choice: any) => (
              <div key={choice.id} className="mb-1">
                <input type="radio" name={`question-${q._id}`} className="me-2"
                  onChange={() => setAnswers({ ...answers, [q._id]: choice.id })} />
                {choice.text}
              </div>
            ))}
          </div>
        )}

        {q.type === "TRUE_FALSE" && (
          <div className="mt-2">
            <div className="mb-1">
              <input type="radio" name={`question-${q._id}`} className="me-2"
                onChange={() => setAnswers({ ...answers, [q._id]: true })} />
              True
            </div>
            <div className="mb-1">
              <input type="radio" name={`question-${q._id}`} className="me-2"
                onChange={() => setAnswers({ ...answers, [q._id]: false })} />
              False
            </div>
          </div>
        )}

        {q.type === "FILL_IN_BLANK" && (
          <div className="mt-2">
            <input type="text" className="form-control" placeholder="Your answer..."
              onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })} />
          </div>
        )}
      </div>
    ))}
    <Button variant="danger" onClick={handleSubmit}>Submit Quiz</Button>
  </div>
);
}