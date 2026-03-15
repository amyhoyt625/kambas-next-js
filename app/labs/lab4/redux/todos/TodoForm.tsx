"use client"
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
      <FormControl value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
      <div className="ms-2 d-flex gap-2">
        <Button onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click" className="btn btn-warning">Update</Button>
        <Button onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click" className="btn btn-success">Add</Button>
      </div>
    </ListGroupItem>
  );
}