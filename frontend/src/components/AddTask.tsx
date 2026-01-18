import type { Task } from "../types/Task";
import TaskForm from "./TaskForm";

type AddTaskProps = {
  type: Task["type"];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function AddTask({
  type,
  isOpen,
  onOpen,
  onClose,
}: AddTaskProps) {
  return (
    <div>
      {isOpen ? (
        <TaskForm type={type} onClose={onClose} />
      ) : (
        <button className={`addBtn ${type}`} onClick={onOpen}>
          +
        </button>
      )}
    </div>
  );
}
