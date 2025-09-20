import { useEffect, useState } from "react";
import type { Todo, TodoByStatus, TodoStatus } from "../../interface/todo";
import { getMockTodo } from "../../data";
import CreateTodo from "./createTodo";
import TodoList from "./todoList";

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

  // Add new todo in list
  function addNewTodo(todo: Todo) {
    setTodo((prevState) => [...prevState, todo]);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>Create To do</h1>
      <CreateTodo onAddTodo={addNewTodo} />
      <TodoList todos={todos} status="todo" />
      <TodoList todos={completedTodos} status="complete" />
    </div>
  );
}
