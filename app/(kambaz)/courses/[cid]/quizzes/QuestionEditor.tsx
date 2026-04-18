"use client";
import { useState } from "react";
import { Button, FormControl, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";

export default function QuestionEditor({
  questions, onChange
}: {
  questions: any[], onChange: (questions: any[]) => void
}) {
  // track which question is being edited by its id
  const [editingId, setEditingId] = useState<string | null>(null);

  // total points is sum of all question points
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  // add a new multiple choice question and open it for editing
  const handleAddQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      points: 1,
      question: "",
      choices: [
        { id: uuidv4(), text: "", isCorrect: false },
        { id: uuidv4(), text: "", isCorrect: false },
      ],
      correctAnswer: true,
      answers: [],
    };
    const updated = [...questions, newQuestion];
    onChange(updated);
    setEditingId(newQuestion._id);
  };

  // update a single field on a question
  const handleUpdateQuestion = (qid: string, field: string, value: any) => {
    onChange(questions.map(q => q._id === qid ? { ...q, [field]: value } : q));
  };

  // delete a question
  const handleDeleteQuestion = (qid: string) => {
    onChange(questions.filter(q => q._id !== qid));
    if (editingId === qid) setEditingId(null);
  };

  // update a specific choice in a multiple choice question
  const handleUpdateChoice = (qid: string, choiceId: string, field: string, value: any) => {
    const q = questions.find(q => q._id === qid);
    const updatedChoices = q.choices.map((c: any) =>
      c.id === choiceId ? { ...c, [field]: value } : c
    );
    handleUpdateQuestion(qid, "choices", updatedChoices);
  };

  // set one choice as correct, unset all others
  const handleSetCorrectChoice = (qid: string, choiceId: string) => {
    const q = questions.find(q => q._id === qid);
    const updatedChoices = q.choices.map((c: any) => ({ ...c, isCorrect: c.id === choiceId }));
    handleUpdateQuestion(qid, "choices", updatedChoices);
  };

  // add a new choice to a multiple choice question
  const handleAddChoice = (qid: string) => {
    const q = questions.find(q => q._id === qid);
    const updatedChoices = [...q.choices, { id: uuidv4(), text: "", isCorrect: false }];
    handleUpdateQuestion(qid, "choices", updatedChoices);
  };

  // add a possible answer to fill in the blank
  const handleAddAnswer = (qid: string) => {
    const q = questions.find(q => q._id === qid);
    handleUpdateQuestion(qid, "answers", [...q.answers, ""]);
  };

  // update a specific answer in fill in the blank
  const handleUpdateAnswer = (qid: string, index: number, value: string) => {
    const q = questions.find(q => q._id === qid);
    const updated = q.answers.map((a: string, i: number) => i === index ? value : a);
    handleUpdateQuestion(qid, "answers", updated);
  };

  // remove an answer from fill in the blank
  const handleRemoveAnswer = (qid: string, index: number) => {
    const q = questions.find(q => q._id === qid);
    handleUpdateQuestion(qid, "answers", q.answers.filter((_: any, i: number) => i !== index));
  };

  return (
    <div>
      {/* total points display */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Total Points: {totalPoints}</span>
        <Button variant="secondary" onClick={handleAddQuestion}>
          + New Question
        </Button>
      </div>

      {/* empty state */}
      {questions.length === 0 && (
        <div className="text-center text-muted p-4 border rounded">
          No questions yet. Click <b>+ New Question</b> to add one.
        </div>
      )}

      {/* question list */}
      {questions.map((q, index) => (
        <div key={q._id} className="border rounded mb-3 p-3">
          {/* question header - always visible */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <FormControl
                style={{ maxWidth: "200px" }}
                value={q.title}
                onChange={(e) => handleUpdateQuestion(q._id, "title", e.target.value)}
                placeholder="Question title" />
              <FormSelect
                style={{ maxWidth: "180px" }}
                value={q.type}
                onChange={(e) => handleUpdateQuestion(q._id, "type", e.target.value)}>
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True/False</option>
                <option value="FILL_IN_BLANK">Fill in the Blank</option>
              </FormSelect>
              <span className="text-muted">pts:</span>
              <FormControl
                type="number"
                style={{ maxWidth: "70px" }}
                value={q.points}
                onChange={(e) => handleUpdateQuestion(q._id, "points", Number(e.target.value))} />
            </div>
            <div className="d-flex gap-2">
              {editingId !== q._id && (
                <Button variant="outline-secondary" size="sm"
                  onClick={() => setEditingId(q._id)}>
                  Edit
                </Button>
              )}
              <FaTrash className="text-danger mt-2" style={{ cursor: "pointer" }}
                onClick={() => handleDeleteQuestion(q._id)} />
            </div>
          </div>

          {/* question edit form - only show when editing */}
          {editingId === q._id && (
            <div className="mt-3">
              {/* question text */}
              <FormControl as="textarea" rows={3} className="mb-3"
                placeholder="Enter question text"
                value={q.question}
                onChange={(e) => handleUpdateQuestion(q._id, "question", e.target.value)} />

              {/* Multiple Choice answers */}
              {q.type === "MULTIPLE_CHOICE" && (
                <div>
                  <div className="fw-bold mb-2">Answers:</div>
                  {q.choices.map((choice: any) => (
                    <div key={choice.id} className="d-flex align-items-center gap-2 mb-2">
                      {/* radio selects this as the correct answer */}
                      <input type="radio" name={`correct-${q._id}`}
                        checked={choice.isCorrect}
                        onChange={() => handleSetCorrectChoice(q._id, choice.id)} />
                      <FormControl
                        placeholder="Choice text"
                        value={choice.text}
                        onChange={(e) => handleUpdateChoice(q._id, choice.id, "text", e.target.value)} />
                        <Button variant="outline-danger" size="sm"
                          onClick={() => handleUpdateQuestion(q._id, "choices", q.choices.filter((c: any) => c.id !== choice.id))}>
                          Remove
                        </Button>
                    </div>
                  ))}
                  <Button variant="outline-secondary" size="sm" onClick={() => handleAddChoice(q._id)}>
                    + Add Another Answer
                  </Button>
                </div>
              )}

              {/* True/False answers */}
              {q.type === "TRUE_FALSE" && (
                <div>
                  <div className="fw-bold mb-2">Correct Answer:</div>
                  <FormCheck type="radio" label="True" name={`tf-${q._id}`}
                    checked={q.correctAnswer === true}
                    onChange={() => handleUpdateQuestion(q._id, "correctAnswer", true)} />
                  <FormCheck type="radio" label="False" name={`tf-${q._id}`}
                    checked={q.correctAnswer === false}
                    onChange={() => handleUpdateQuestion(q._id, "correctAnswer", false)} />
                </div>
              )}

              {/* Fill in the Blank answers */}
              {q.type === "FILL_IN_BLANK" && (
                <div>
                  <div className="fw-bold mb-2">Possible Correct Answers:</div>
                  {q.answers.map((answer: string, i: number) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                      <FormControl
                        placeholder="Possible answer"
                        value={answer}
                        onChange={(e) => handleUpdateAnswer(q._id, i, e.target.value)} />
                      <Button variant="outline-danger" size="sm"
                        onClick={() => handleRemoveAnswer(q._id, i)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline-secondary" size="sm"
                    onClick={() => handleAddAnswer(q._id)}>
                    + Add Another Answer
                  </Button>
                </div>
              )}

              {/* Cancel and Save buttons */}
              <div className="d-flex gap-2 mt-3">
                <Button variant="secondary" size="sm"
                  onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
                <Button variant="danger" size="sm"
                  onClick={() => setEditingId(null)}>
                  Update Question
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}