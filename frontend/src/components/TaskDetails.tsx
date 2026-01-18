import { useState } from "react";
import type { Task } from "../types/Task";
import { useTasksContext } from "../hooks/useTasksContext";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

interface TaskDetailsProp {
  task: Task;
}

export default function TaskDetails({ task }: TaskDetailsProp) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch, tasks } = useTasksContext();

  const taskFromContext = tasks?.find((t) => t._id === task._id);

  async function handleDelete() {
    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  }

  function startEditing() {
    setIsEditing(true);
  }

  async function handleEdit() {
    const response = await fetch("/api/tasks/" + task._id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_TASK", payload: json });
      setIsEditing(false);
    }
  }

  if (isEditing) {
    const isSaveDisabled = title.trim() === "";

    return (
      <div className="task-details">
        <div className="task-section">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="buttons-section">
          <button onClick={handleEdit} disabled={isSaveDisabled}>
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-details">
      <div className="task-section">
        <h4>{taskFromContext?.title || title}</h4>
        <p>{taskFromContext?.description || description}</p>
        <p>
          Last updated:{" "}
          {formatDistanceToNow(
            new Date(taskFromContext?.updatedAt || task.updatedAt),
            {
              addSuffix: true,
            }
          )}
        </p>
      </div>
      <div className="buttons-section">
        <span onClick={startEditing} className="editBtn">
          {<MdOutlineEdit />}
        </span>
        <span onClick={handleDelete} className="deleteBtn">
          {<MdDeleteOutline />}
        </span>
      </div>
    </div>
  );
}
