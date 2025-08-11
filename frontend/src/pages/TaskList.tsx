import { useContext, useEffect } from "react";
import TaskTable from "../components/TaskTable";
import { TasksContext, type TasksContextType } from "../contexts/TasksContext";

export default function TaskList() {
  const { tasks, fetchData } = useContext(TasksContext) as TasksContextType;

  useEffect(fetchData, []); // Actualiza los datos de las tareas

  if (tasks.length === 0) {
    return <span>NO HAY DATOS!</span>
  } else {
    return (
      <>
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Todas las tareas
        </h2>
        <TaskTable tasks={tasks} />
      </>
    );
  }
}
