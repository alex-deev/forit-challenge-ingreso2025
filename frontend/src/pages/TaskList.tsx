import { useEffect, useState } from "react";
import type { Task } from "../models/Task.model";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then((res) => {
        console.log(`-> request: ${res.url} : status: ${res.statusText}`);
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Tareas
      </h2>
    </>
  );
}
