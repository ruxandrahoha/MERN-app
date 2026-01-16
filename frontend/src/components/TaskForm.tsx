import { useState } from "react";
import type { Task } from "../types/Task";
import { useTasksContext } from "../hooks/useTasksContext";

interface TaskFormProps {
  type: Task["type"];
}

export default function TaskForm({ type }: TaskFormProps) {
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const task = { title, description, type };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      console.log("new task added");
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <div className="">
      <form className="create" onSubmit={handleSubmit}>
        <label>Title*</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label>Description (optional)</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button>Add task</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
