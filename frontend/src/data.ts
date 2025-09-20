import type { Todo } from "./interface/todo";


const mockTodo : Todo[] = [
    { id: 1, task: "Buy groceries", status: "todo", dueDate: "2025-09-20" },
    { id: 2, task: "Read a book", status: "complete", dueDate: "2025-09-18" },
    { id: 3, task: "Write code", status: "todo", dueDate: "2025-09-22" },
    { id: 4, task: "Exercise", status: "complete", dueDate: "2025-09-15" },
    { id: 5, task: "Call friend", status: "todo", dueDate: "2025-09-25" },
    { id: 6, task: "Clean room", status: "complete", dueDate: "2025-09-19" },
    { id: 7, task: "Pay bills", status: "todo", dueDate: "2025-09-21" },
    { id: 8, task: "Plan trip", status: "complete", dueDate: "2025-09-23" },
    { id: 9, task: "Cook dinner", status: "todo", dueDate: "2025-09-24" },
    { id: 10, task: "Watch movie", status: "complete", dueDate: "2025-09-17" }
];

export async function getMockTodo(): Promise<Todo[]> {
    return new Promise((resolve) => {
        setTimeout(()=> {
        resolve(mockTodo)
        },1000)
    }) 
}