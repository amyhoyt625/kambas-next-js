"use client";
import { useState } from "react";
import { Button, FormControl, FormSelect, FormCheck } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";

export default function QuestionEditor({
  questions, onChange
}: {
  questions: any[], onChange: (questions: any[]) => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftQuestion, setDraftQuestion] = useState<any | null>(null);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

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
    onChange([...questions, newQuestion]);
    setEditingId(newQuestion._id);
    setDraftQuestion({ ...newQuestion });
  };

  const handleDeleteQuestion = (qid: string) => {
    onChange(questions.filter(q => q._id !== qid));
    if (editingId === qid) {
      setEditingId(null);
      setDraftQuestion(null);
    }
  };

  // ---------- DRAFT HELPERS ----------
  const updateDraftField = (field: string, value: any) => {
    setDraftQuestion({ ...draftQuestion, [field]: value });
  };

  const updateChoice = (choiceId: string, field: string, value: any) => {
    const updated = draftQuestion.choices.map((c: any) =>
      c.id === choiceId ? { ...c, [field]: value } : c
    );
    updateDraftField("choices", updated);
  };

  const setCorrectChoice = (choiceId: string) => {
    const updated = draftQuestion.choices.map((c: any) => ({
      ...c,
      isCorrect: c.id === choiceId
    }));
    updateDraftField("choices", updated);
  };

  const addChoice = () => {
    updateDraftField("choices", [
      ...draftQuestion.choices,
      { id: uuidv4(), text: "", isCorrect: false }
    ]);
  };

  const removeChoice = (choiceId: string) => {
    updateDraftField(
      "choices",
      draftQuestion.choices.filter((c: any) => c.id !== choiceId)
    );
  };

  const addAnswer = () => {
    updateDraftField("answers", [...draftQuestion.answers, ""]);
  };

  const updateAnswer = (index: number, value: string) => {
    const updated = draftQuestion.answers.map((a: string, i: number) =>
      i === index ? value : a
    );
    updateDraftField("answers", updated);
  };

  const removeAnswer = (index: number) => {
    updateDraftField(
      "answers",
      draftQuestion.answers.filter((_: any, i: number) => i !== index)
    );
  };

  const handleSave = () => {
    onChange(
      questions.map(q =>
        q._id === draftQuestion._id ? draftQuestion : q
      )
    );
    setEditingId(null);
    setDraftQuestion(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraftQuestion(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Total Points: {totalPoints}</span>
        <Button variant="secondary" onClick={handleAddQuestion}>
          + New Question
        </Button>
      </div>

      {questions.length === 0 && (
        <div className="text-center text-muted p-4 border rounded">
          No questions yet. Click <b>+ New Question</b>.
        </div>
      )}

      {questions.map((q) => {
        const isEditing = editingId === q._id;
        const data = isEditing ? draftQuestion : q;

        return (
          <div key={q._id} className="border rounded mb-3 p-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <FormControl
                  style={{ maxWidth: "200px" }}
                  value={data.title}
                  disabled={!isEditing}
                  onChange={(e) => updateDraftField("title", e.target.value)}
                />
                <FormSelect
                  style={{ maxWidth: "180px" }}
                  value={data.type}
                  disabled={!isEditing}
                  onChange={(e) => updateDraftField("type", e.target.value)}
                >
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="TRUE_FALSE">True/False</option>
                  <option value="FILL_IN_BLANK">Fill in the Blank</option>
                </FormSelect>
                <FormControl
                  type="number"
                  style={{ maxWidth: "70px" }}
                  value={data.points}
                  disabled={!isEditing}
                  onChange={(e) => updateDraftField("points", Number(e.target.value))}
                />
              </div>

              <div className="d-flex gap-2">
                {!isEditing && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingId(q._id);
                      setDraftQuestion({ ...q });
                    }}
                  >
                    Edit
                  </Button>
                )}
                <FaTrash
                  className="text-danger mt-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteQuestion(q._id)}
                />
              </div>
            </div>

            {/* EDIT MODE */}
            {isEditing && (
              <div className="mt-3">
                <FormControl
                  as="textarea"
                  rows={3}
                  className="mb-3"
                  value={data.question}
                  onChange={(e) => updateDraftField("question", e.target.value)}
                />

                {/* MULTIPLE CHOICE */}
                {data.type === "MULTIPLE_CHOICE" && (
                  <>
                    {data.choices.map((choice: any) => (
                      <div key={choice.id} className="d-flex gap-2 mb-2">
                        <input
                          type="radio"
                          checked={choice.isCorrect}
                          onChange={() => setCorrectChoice(choice.id)}
                        />
                    <FormControl
                      as="textarea"
                      rows={2}
                      value={choice.text}
                      onChange={(e) =>
                        updateChoice(choice.id, "text", e.target.value)
                      }
                    />
                        <Button size="sm" onClick={() => removeChoice(choice.id)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={addChoice}>
                      + Add Answer
                    </Button>
                  </>
                )}

                {/* TRUE/FALSE */}
                {data.type === "TRUE_FALSE" && (
                  <>
                    <FormCheck
                      type="radio"
                      label="True"
                      checked={data.correctAnswer === true}
                      onChange={() => updateDraftField("correctAnswer", true)}
                    />
                    <FormCheck
                      type="radio"
                      label="False"
                      checked={data.correctAnswer === false}
                      onChange={() => updateDraftField("correctAnswer", false)}
                    />
                  </>
                )}

                {/* FILL IN BLANK */}
                {data.type === "FILL_IN_BLANK" && (
                  <>
                    {data.answers.map((ans: string, i: number) => (
                      <div key={i} className="d-flex gap-2 mb-2">
                        <FormControl
                          value={ans}
                          onChange={(e) => updateAnswer(i, e.target.value)}
                        />
                        <Button size="sm" onClick={() => removeAnswer(i)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={addAnswer}>
                      + Add Answer
                    </Button>
                  </>
                )}

                {/* ACTIONS */}
                <div className="d-flex gap-2 mt-3">
                  <Button size="sm" variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" variant="danger" onClick={handleSave}>
                    Update Question
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}