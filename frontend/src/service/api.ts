import axios, { type AxiosResponse } from "axios";
import type { CreateTodo, GetTodoList } from "../interface/todo";

const baseURL = "http://localhost:3000";

async function handleRequest<T>(request: Promise<AxiosResponse>): Promise<T> {
  try {
    const response = await request;
    return response.data as T;
  } catch (error) {
    throw error;
  }
}

export async function getTodos(): Promise<GetTodoList> {
  return handleRequest<GetTodoList>(axios.get(`${baseURL}/todos`));
}

export async function postTodo(todo: FormData): Promise<GetTodoList> {
  return handleRequest<GetTodoList>(axios.post(`${baseURL}/todos`, todo));
}
