import type { Todo, TodoStatus } from "../../interface/todo";

export default function TodoList({
  todos,
  status,
}: {
  todos: Todo[];
  status: TodoStatus;
}) {
  function redirectToEditPage(id: number) {
    window.location.href = `/edit/${id}`;
  }

  function deleteTodo(id: number) {
    console.log("Delete todo with id:", id);
  }

  const displayTodos = todos.map((todo, index) => (
    <li key={index}>
      {todo.task} - {todo.status} - {todo.dueDate}
      <button onClick={() => redirectToEditPage(todo.id)}>Edit</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  ));
  return (
    <>
      <h2>{status}</h2>
      <ul>{displayTodos}</ul>
    </>
  );
}
