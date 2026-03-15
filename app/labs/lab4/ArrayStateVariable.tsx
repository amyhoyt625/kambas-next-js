"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { addTodo, deleteTodo, updateTodo, setTodo } from "./redux/todos/todosReducer";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function ArrayStateVariable() {
  const { todos, todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => setArray([...array, Math.floor(Math.random() * 100)]);
  const deleteElement = (index: number) => setArray(array.filter((_, i) => i !== index));

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <Button variant="success" className="mb-2" onClick={addElement}>
        Add Element
      </Button>
      <ul className="list-group mb-3">
        {array.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <b>{item}</b>
            <Button variant="danger" onClick={() => deleteElement(index)}>Delete</Button>
          </li>
        ))}
      </ul>

      <div className="d-flex gap-2 mb-3">
        <FormControl value={todo.title}
          onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
          placeholder="New todo..." />
        <Button variant="warning" onClick={() => dispatch(updateTodo(todo))}>Update</Button>
        <Button variant="success" onClick={() => dispatch(addTodo(todo))}>Add</Button>
      </div>

      <ListGroup>
        {todos.map((t: any) => (
          <ListGroupItem key={t.id} className="d-flex justify-content-between align-items-center">
            <span>{t.title}</span>
            <div className="d-flex gap-2">
              <Button variant="primary" size="sm" onClick={() => dispatch(setTodo(t))}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => dispatch(deleteTodo(t.id))}>Delete</Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}