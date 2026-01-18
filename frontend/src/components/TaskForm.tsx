import { useState, useRef, useEffect } from "react";
import type { Task } from "../types/Task";
import { useTasksContext } from "../hooks/useTasksContext";

interface TaskFormProps {
  type: Task["type"];
  onClose: () => void;
}

export default function TaskForm({ type, onClose }: TaskFormProps) {
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        title === "" &&
        description == ""
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [title, description, onClose]);

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
    <div ref={containerRef} className="">
      <form className="create" onSubmit={handleSubmit}>
        <label>Title*</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          ref={inputRef}
        />
        <label>Description (optional)</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button className="submitBtn">Add task</button>
        <button className="cancelBtn" onClick={onClose}>
          Cancel
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
