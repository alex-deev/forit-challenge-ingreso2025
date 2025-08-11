import { useParams } from "react-router-dom";
import TaskContent from "../components/TaskContent";
import { useContext, useEffect } from "react";
import { TasksContext, type TasksContextType } from "../contexts/TasksContext";
import type { Task } from "../models/Task.model";

export default function TaskItem() {
  const { id } = useParams();
  const { tasks,  fetchData } = useContext(TasksContext) as TasksContextType;
  const currentTask = findTask(id);
  
  useEffect(fetchData, []); // Actualiza los datos de las tareas

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
        Tarea
      </h2>
      {currentTask ? (
        <TaskContent task={currentTask} />
      ) : (
        <span className="text-lg">Oops! Esta tarea ya no existe...</span>
      )}
    </>
  );
}
