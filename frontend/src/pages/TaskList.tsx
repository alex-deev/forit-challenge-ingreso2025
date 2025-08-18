import { useContext, useEffect } from "react";
import TaskTable from "../components/TaskTable";
import { TasksContext, type TasksContextType } from "../contexts/TasksContext";

export default function TaskList() {
  const { tasks, fetchData } = useContext(TasksContext) as TasksContextType;

  useEffect(() => {
    fetchData(); // Refresco inicial, cada vez que se monta el componente
  
    const refreshData = setInterval(() => fetchData(), 5000); // Refresca la lista de tareas cada 5s

    return () => {
      clearInterval(refreshData); // Elimina el intervalo para limpiar memoria
    }
  }, []);
  
  return (
    <>
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Todas las tareas
      </h2>
      <TaskTable tasks={tasks} />
    </>
  );
}
