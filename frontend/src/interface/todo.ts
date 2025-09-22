export interface Todo {
  id: number;
  task: string;
  status: TodoStatus;
  dueDate: string;
}

export interface CreateTodo {
  task: string;
  status: TodoStatus;
  dueDate: string;
}

export interface ApiResponse<T> {
  result: T;
  message: string;
}

export type GetTodoList = ApiResponse<Todo[]>;

export type PostTodo = ApiResponse<null>;

export type TodoByStatus = Record<string, { todos: Todo[]; status: string }>;

export type TodoStatus = "todo" | "complete";
