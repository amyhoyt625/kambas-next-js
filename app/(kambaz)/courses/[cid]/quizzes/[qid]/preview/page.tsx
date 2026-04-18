"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { findQuizById } from "../../client";
import { Button } from "react-bootstrap";

export default function QuizPreview() {
  const { qid, cid } = useParams(); 
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await findQuizById(qid as string);
      setQuiz(data);
    };
    load();
  }, [qid]);


    //grading functionality 
    const handleSubmit = () => {
      let correct = 0;
  
      questions.forEach((q: any) => {
        const selected = answers[q._id];
  
        if (q.type === "MULTIPLE_CHOICE") {
          const correctChoice = q.choices.find((c:any) => c.isCorrect);
          if (correctChoice && selected === correctChoice.id) correct++
        }
  
        if (q.type === "TRUE_FALSE") {
          if (selected === q.correctAnswer) correct++
        }
  
        if (q.type === "FILL_IN_BLANK") {
          if (q.answers.includes(selected)) correct ++
        }
      });
  
      setScore(correct);
      setSubmitted(true);
    }

  const questions = quiz?.questions || [];

  if (!quiz) return <div>Loading...</div>;


  if (submitted) {
    return (
      <div className="p-4">
        <h2>{quiz.title} - Results</h2>
        <h4 className="mt-3">Score: {score} / {questions.length}</h4>
        <hr />
  
        {questions.map((q: any, index: number) => {
          const selected = answers[q._id];
          let isCorrect = false;
  
          if (q.type === "MULTIPLE_CHOICE") {
            const correctChoice = q.choices.find((c: any) => c.isCorrect);
            isCorrect = correctChoice && selected === correctChoice.id;
          }
          if (q.type === "TRUE_FALSE") {
            isCorrect = selected === q.correctAnswer;
          }
          if (q.type === "FILL_IN_BLANK") {
            isCorrect = q.answers.includes(selected);
          }
  
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
  
        <Button variant="danger" 
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
          Edit Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <hr />

      {questions.map((q: any, index: number) => (
        <div key={q._id} className="border rounded p-3 mb-3">
         <div className="d-flex justify-content-between">
            <b> Question {index + 1}</b>
            <span> {q.points} pts </span>
          </div>
          <p className="mt-2"> {q.question} </p>

          {/* Multiple Choice */}
          {q.type === "MULTIPLE_CHOICE" && (
            <div className="mt-2">
              {q.choices.map((choice: any) => (
                <div key={choice.id} className="mb-1">
                  <input type="radio" name={`question-${q._id}`} className="me-2" 
                  onChange={() => setAnswers({ ...answers, [q._id]:choice.id})}/>
                  {choice.text}
                </div>
              ))}
            </div>
          )}

          {/* True/False */}
          {q.type === "TRUE_FALSE" && (
            <div className="mt-2">
              <div className="mb-1">
                <input type="radio" name={`question-${q._id}`} className="me-2" 
                onChange={() => setAnswers({ ...answers, [q._id]:true})} />
                True
              </div>
              <div className="mb-1">
                <input type="radio" name={`question-${q._id}`} className="me-2" 
                onChange={() => setAnswers({ ...answers, [q._id]:false})} />
                False
              </div>
            </div>
          )}

          {/* Fill in the Blank */}
          {q.type === "FILL_IN_BLANK" && (
            <div className="mt-2">
              <input type="text" className="form-control" placeholder="Your answer..." 
              onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value})} />
              
            </div>
          )}

        </div>
      ))}

      <Button variant="danger" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </div>
  );
}