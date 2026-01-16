import type { Task } from "../types/Task";
import { useTasksContext } from "../hooks/useTasksContext";
import { MdDeleteOutline } from "react-icons/md";

interface TaskDetailsProp {
  task: Task;
}

export default function TaskDetails({ task }: TaskDetailsProp) {
  const { dispatch } = useTasksContext();

  async function handleClick() {
    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  }

  return (
    <div className="task-details">
      <div className="task-section">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>Last updated: {task.updatedAt}</p>
      </div>
      <span onClick={handleClick} className="task-section deleteBtn">
        {<MdDeleteOutline />}
      </span>
    </div>
  );
}
