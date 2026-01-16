import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import type { Task } from "../types/Task";

import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const { tasks, dispatch } = useTasksContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    fetchTasks();
  }, [dispatch]);

  function getTasks(type: Task["type"]) {
    if (!tasks) return null;

    return tasks
      .filter((task) => task.type === type)
      .map((task) => <TaskDetails key={task._id} task={task} />);
  }

  return (
    <div className="home">
      <div className="tasks">
        <div className="kanban-column todo">
          <h3>To Do</h3>
          {getTasks("todo")}
          <TaskForm type="todo" />
        </div>

        <div className="kanban-column in-progress">
          <h3>In Progress</h3>
          {getTasks("in-progress")}
          <TaskForm type="in-progress" />
        </div>

        <div className="kanban-column done">
          <h3>Done</h3>
          {getTasks("done")}
          <TaskForm type="done" />
        </div>
      </div>
    </div>
  );
}
