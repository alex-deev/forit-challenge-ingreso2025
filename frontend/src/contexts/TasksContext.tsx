import { createContext, useEffect, useState } from "react";
import { toArrayOfTask, type Task } from "../models/Task.model";

console.log(import.meta.env.MODE);
export let api_base_url: string;
if (import.meta.env.MODE === "development") {
  api_base_url = "http://localhost:3000/api";
} else {
  api_base_url = import.meta.env.VITE_API_BASE_URL;
}

type TasksContextProviderProps = {
  children: React.ReactNode;
};

export type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  refetch: () => void;
};

export const TasksContext = createContext<null | TasksContextType>(null);

export default function TasksContextProvider({
  children,
}: TasksContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Intenta convertir los datos JSON en un arreglo de Task, si no lo logra devuelve un array vacio e imprime por consola el error.
   */
  function parseTasksData(json: any): Task[] {
    const parsedTasks = toArrayOfTask(json);
    if (!parsedTasks) {
      // Si no puede convertir el json a Task[]
      console.error("Error al intentar convertir los datos traídos de la API!");
      return []; // Devuevle un arreglo vacio
    }
    return parsedTasks;
  }
  const refetch = () => {
    fetch(`${api_base_url}/tasks`)
      .then((res) => res.json())
      .then((json) => {
        const processedTasks = parseTasksData(json);
        setTasks(processedTasks);
        console.log("Se obtuvo los datos de la API correctamente!");
      })
      .catch((e) => {
        console.error("Error al obtener los datos de la API! ", e);
      });
  };

  useEffect(() => refetch, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, refetch }}>
      {children}
    </TasksContext.Provider>
  );
}
