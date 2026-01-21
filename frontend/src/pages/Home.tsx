import { useState, useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import type { Task } from "../types/Task";

import TaskDetails from "../components/TaskDetails";
import AddTask from "../components/AddTask";
import { apiFetch } from "../api";

export default function Home() {
  const [addNewTask, setAddNewTask] = useState("");

  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const apiFetchTasks = async () => {
      const response = await apiFetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if (user) {
      apiFetchTasks();
    }
  }, [dispatch, user]);

  function getTasks(type: Task["type"]) {
    if (!tasks) return null;

    return tasks
      .filter((task) => task.type === type)
      .map((task) => <TaskDetails key={task._id} task={task} />);
  }

  function handleNewTask(type: Task["type"]) {
    setAddNewTask(type);
  }

  return (
    <div className="home">
      <div className="tasks">
        <div className="kanban-column todo">
          <h3>To Do</h3>

          {getTasks("todo")}

          <AddTask
            type="todo"
            isOpen={addNewTask === "todo"}
            onOpen={() => handleNewTask("todo")}
            onClose={() => setAddNewTask("")}
          />
        </div>

        <div className="kanban-column in-progress">
          <h3>In Progress</h3>
          {getTasks("in-progress")}

          <AddTask
            type="in-progress"
            isOpen={addNewTask === "in-progress"}
            onOpen={() => handleNewTask("in-progress")}
            onClose={() => setAddNewTask("")}
          />
        </div>

        <div className="kanban-column done">
          <h3>Done</h3>
          {getTasks("done")}

          <AddTask
            type="done"
            isOpen={addNewTask === "done"}
            onOpen={() => handleNewTask("done")}
            onClose={() => setAddNewTask("")}
          />
        </div>
      </div>
    </div>
  );
}
