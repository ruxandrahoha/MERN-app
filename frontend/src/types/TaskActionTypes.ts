import type { Task } from "./Task";

export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] | null }
  | { type: "CREATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task };
