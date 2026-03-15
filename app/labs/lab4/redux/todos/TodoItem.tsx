"use client"
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
      {todo.title}
      <div className="ms-auto d-flex gap-2">
        <Button onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click">Edit</Button>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click" className="btn btn-danger">Delete</Button>
      </div>
    </ListGroupItem>
  );
}