import { useEffect, useState, type SetStateAction } from "react";
import type { Todo, TodoByStatus, TodoStatus } from "../../interface/todo";
import { getMockTodo } from "../../data";
import CreateTodo from "./createTodo";
import TodoList from "./todoList";
import { getTodos } from "../../service/api";

const DisplayStatus: { label: string; value: TodoStatus }[] = [
  { label: "To Do", value: "todo" },
  { label: "Completed", value: "complete" },
];

async function getTodoList(
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

  // Add new todo in list
  function addNewTodo(todo: Todo) {
    setTodo((prevState) => [...prevState, todo]);
  }

  useEffect(() => {
    getTodoList(setTodo, setCompletedTodos);
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
