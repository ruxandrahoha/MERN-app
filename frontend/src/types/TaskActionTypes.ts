import type { Task } from "./Task";

export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "CREATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: Task };
