import { useParams } from "react-router-dom";
import TaskContent from "../components/TaskContent";
import { useContext } from "react";
import { TasksContext, type TasksContextType } from "../contexts/TasksContext";
import type { Task } from "../models/Task.model";

export default function TaskItem() {
  const { id } = useParams();
  const { tasks } = useContext(TasksContext) as TasksContextType;

  return (
    <>
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Tarea
      </h2>
      <TaskContent task={findTask(id)} />
    </>
  );

  function findTask(id: string | undefined): Task {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return {
        id: "-1",
        title: "inexistente",
        description: "---",
        completed: false,
        createdAt: new Date(),
      };
    }
    return tasks[index];
  }
}
