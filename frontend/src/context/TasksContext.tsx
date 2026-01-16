import { createContext, useReducer, type ReactNode } from "react";
import type { Task } from "../types/Task";
import type { TaskAction } from "../types/TaskActionTypes";

type TasksState = {
  tasks: Task[] | null;
};

type TasksContextType = {
  tasks: Task[] | null;
  dispatch: React.Dispatch<TaskAction>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const tasksReducer = (state: TasksState, action: TaskAction) => {
  switch (action.type) {
    case "SET_TASKS": {
      return {
        tasks: action.payload,
      };
    }
    case "CREATE_TASK": {
      return {
        tasks: [...(state.tasks || []), action.payload],
      };
    }
    case "DELETE_TASK": {
      return {
        tasks: (state.tasks ?? []).filter((t) => t._id !== action.payload._id),
      };
    }
    default:
      return state;
  }
};

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
  });

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
