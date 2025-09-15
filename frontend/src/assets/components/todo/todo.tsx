import { useEffect, useState } from "react";
import type { Todo, TodoByStatus, TodoStatus } from "../../interface/todo";
import { getMockTodo } from "../../data";

const DisplayStatus: { label: string; value: TodoStatus }[] = [
  { label: "To Do", value: "todo" },
  { label: "Completed", value: "complete" },
];

function filterTodoByStatus(todos: Todo[]): TodoByStatus {
  const todoByStatus: TodoByStatus = {};
  DisplayStatus.forEach((status) => {
    todoByStatus[status.value] = { todos: [], status: status.value };
  });
  for (const item of todos) {
    if (todoByStatus[item.status]) {
      todoByStatus[item.status].todos.push(item);
    }
  }
  return todoByStatus;
}

export default function TodoComponent() {
  let todoByStatus: TodoByStatus = {};
  const [todos, setTodo] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const getTodos = async () => {
    const data = await getMockTodo();
    todoByStatus = filterTodoByStatus(data);
    setTodo(todoByStatus["todo"].todos);
    setCompletedTodos(todoByStatus["complete"].todos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>Create To do</h1>
      <CreateTodo />
      <TodoList todos={todos} status="todo" />
      <TodoList todos={completedTodos} status="complete" />
    </div>
  );
}

function CreateTodo() {
  const [createTodo, setCreateTodo] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCreateTodo(event.target.value);
  }
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Enter new task"
          value={createTodo}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

function TodoList({ todos, status }: { todos: Todo[]; status: TodoStatus }) {
  const displayTodos = todos.map((todo, index) => (
    <li key={index}>
      {todo.task} - {todo.status} - {todo.dueDate}
    </li>
  ));
  return (
    <>
      <h2>{status}</h2>
      <ul>{displayTodos}</ul>
    </>
  );
}
