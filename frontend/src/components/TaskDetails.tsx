import type { Task } from "../types/Task";

interface TaskDetailsProp {
  task: Task;
}

export default function TaskDetails({ task }: TaskDetailsProp) {
  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Last updated: {task.updatedAt}</p>
    </div>
  );
}
