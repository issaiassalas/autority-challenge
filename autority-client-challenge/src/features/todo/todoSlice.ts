import { createSlice } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
  updatedAt: Date;
  createdAt: Date;
  deletedAt?: Date;
}

export interface TodoState {
  tasks: Task[];
  action: "fetch" | "idle";
  order: "latest" | "older";
}

const initialState: TodoState = {
  tasks: [],
  action: "fetch",
  order: "latest",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.order = action.payload.order || state.order;
      state.tasks = [
        ...action.payload.tasks.sort((a, b) => {
          if (state.order === "latest") {
            return b.id - a.id;
          }
          return a.id - b.id;
        }),
      ];
      state.action = action.payload.action || state.action;
    },
    todoFetchAction: (state) => {
      state.action = "fetch";
    },
  },
});

export const { setTodo, todoFetchAction } = todoSlice.actions;

export default todoSlice.reducer;
