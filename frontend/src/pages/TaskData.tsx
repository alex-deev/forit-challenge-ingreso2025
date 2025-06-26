import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useContext } from "react";
import { TasksContext, type TasksContextType } from "../contexts/TasksContext";
import type { Task } from "../models/Task.model";

export default function TaskData() {
  const { id } = useParams();
  const { tasks } = useContext(TasksContext) as TasksContextType;
  const currentTask = findTask(id);

  function findTask(id: string | undefined): Task | undefined {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return undefined;
    }
    return tasks[index];
  }

  return (
    <>
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Crear/modifcar Tarea
      </h2>
      {currentTask ? (
        <TaskForm task={currentTask} />
      ) : (
        <TaskForm />
      )}
    </>
  );
}
