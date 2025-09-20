import { useState } from "react";
import type { Todo } from "../../interface/todo";

export default function CreateTodo({
  onAddTodo,
}: {
  onAddTodo: (todo: Todo) => void;
}) {
  const [createTodo, setCreateTodo] = useState({
    task: "",
    dueDate: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.name, event.target.value);
    setCreateTodo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form submitted", createTodo);
    const newTodo: Todo = {
      id: 0,
      task: createTodo.task,
      status: "todo",
      dueDate: createTodo.dueDate,
    };
    onAddTodo(newTodo);
    setCreateTodo({ task: "", dueDate: "" });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ fontSize: "18px" }}>
          <label htmlFor="task">Task Name: </label>
          <input
            type="text"
            placeholder="Enter new task"
            value={createTodo.task}
            name="task"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date: </label>
          <input
            name="dueDate"
            type="date"
            value={createTodo.dueDate}
            onChange={handleChange}
            placeholder="Select due date"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
