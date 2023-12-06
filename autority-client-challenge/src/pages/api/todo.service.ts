import { Task } from "../../features/todo/todoSlice";

export const BASE_URL = "http://localhost:4000";

export async function fetchAllTasks(query = ""): Promise<Task> {
  const response = await fetch(`${BASE_URL}/tasks?query=${query}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

export async function createTask(payload): Promise<any> {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

export async function getTaskById(id): Promise<any> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "GET",
  });
  return response;
}

export async function updateTask(id, payload): Promise<any> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

export async function deleteTask(id): Promise<any> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
}
