"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos();

  return (
    <div id="wd-react-context-todo-list">
      <h2>React Context Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-center">
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <div className="ms-2 d-flex gap-2">
            <Button onClick={updateTodo} className="btn btn-warning">
              Update
            </Button>
            <Button onClick={addTodo} className="btn btn-success">
              Add
            </Button>
          </div>
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id} className="d-flex align-items-center">
            {t.title}
            <div className="ms-auto d-flex gap-2">
              <Button onClick={() => setTodo(t)}>
                Edit
              </Button>
              <Button onClick={() => deleteTodo(t.id)} className="btn btn-danger">
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}