import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter-reference-redux/counterSlice";
import todoReducer from "../features/todo/todoSlice";

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, todo: todoReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
