export interface Todo {
    id: number;
    task: string;
    status: TodoStatus;
    dueDate: string;
}

export interface GetTodoList {
    result: Todo[];
}

export type TodoByStatus = Record<string, { todos: Todo[]; status: string }>;


export type TodoStatus = "todo" | "complete";