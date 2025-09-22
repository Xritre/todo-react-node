import { useEffect, useState, type SetStateAction } from "react";
import type { Todo, TodoByStatus, TodoStatus } from "../../interface/todo";
import CreateTodo from "./createTodo";
import TodoList from "./todoList";
import { getTodos } from "../../service/api";

const DisplayStatus: { label: string; value: TodoStatus }[] = [
  { label: "To Do", value: "todo" },
  { label: "Completed", value: "complete" },
];

async function getTodoData(
  setTodo: React.Dispatch<SetStateAction<Todo[]>>,
  setCompletedTodos: React.Dispatch<SetStateAction<Todo[]>>
): Promise<TodoByStatus> {
  try {
    let todoByStatus: TodoByStatus = {};
    const todosResponse = await getTodos();
    const todoList = todosResponse.result;
    todoByStatus = filterTodoByStatus(todoList);
    console.log("todoByStatus", todoByStatus);
    setTodo(todoByStatus["todo"].todos);
    setCompletedTodos(todoByStatus["complete"].todos);
    return todoByStatus;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {};
  }
}

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
  const [todos, setTodo] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodoData(setTodo, setCompletedTodos);
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
