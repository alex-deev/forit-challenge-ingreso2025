import { createContext, useState } from "react";
import { toArrayOfTask, type Task } from "../models/Task.model";

const APP_MODE = import.meta.env.MODE;
console.log(`Application in ${APP_MODE} mode...`);

const API_BASE_URL =
  APP_MODE === "development"
    ? "http://localhost:3000/api"
    : import.meta.env.VITE_API_BASE_URL;

type TasksContextProviderProps = {
  children: React.ReactNode;
};

export type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchData: () => void;
  postData: (task: Task) => void;
  putData: (task: Task) => void;
  deleteData: (id: string) => void;
};

export const TasksContext = createContext<null | TasksContextType>(null);

/** Context Provider */
export default function TasksContextProvider({
  children,
}: TasksContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // GET request
  const fetchData = () => {
    fetch(`${API_BASE_URL}/tasks`)
      .then((res) => {
        console.log(`-> GET status: ${res.statusText}`);
        return res.json();
      })
      .then((json) => {
        const processedTasks = parseTasksData(json);
        setTasks(processedTasks);
      })
      .catch((e) => console.error(e));
  };

  // POST request
  const postData = (task: Task) => {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    };
    fetch(`${API_BASE_URL}/tasks`, request)
      .then((res) => console.log(`-> POST status: ${res.statusText}`))
      .catch((e) => console.error(e));
  };

  // PUT request
  const putData = (task: Task) => {
    const request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    };
    fetch(`${API_BASE_URL}/tasks/${task.id}`, request)
      .then((res) => console.log(`-> PUT status: ${res.statusText}`))
      .catch((e) => console.error(e));
  };

  // DELETE request
  const deleteData = (id: string) => {
    const request = {
      method: "DELETE",
    };
    fetch(`${API_BASE_URL}/tasks/${id}`, request)
      .then((res) => console.log(`-> DELETE status: ${res.statusText}`))
      .catch((e) => console.error(e));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, fetchData, postData, putData, deleteData }}
    >
      {children}
    </TasksContext.Provider>
  );
}

/** Intenta convertir los datos JSON en un arreglo de Task, si no lo logra devuelve un array vacio e imprime por consola el error. */
function parseTasksData(json: any): Task[] {
  const parsedTasks = toArrayOfTask(json);
  if (!parsedTasks) {
    // Si no puede convertir el json a Task[]
    console.error("Error al intentar convertir los datos traídos de la API!");
    return []; // Devuevle un arreglo vacio
  }
  return parsedTasks;
}
