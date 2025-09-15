import type { Todo, TodoStatus } from "../../interface/todo";

export default function TodoList({
  todos,
  status,
}: {
  todos: Todo[];
  status: TodoStatus;
}) {
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
