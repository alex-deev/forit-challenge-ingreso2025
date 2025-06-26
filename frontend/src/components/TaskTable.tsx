import { useNavigate } from "react-router-dom";
import type { Task } from "../models/Task.model";
import { Button } from "./Button";
import TaskRow from "./TaskRow";

export default function TaskTable(props: { tasks: Task[] }) {
  const tasks = props.tasks;
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Título
            </th>
            <th scope="col" className="px-6 py-3">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Creado
            </th>
            <th scope="col" className="text-center py-2">
              <Button
                text="Añadir"
                color="green"
                onCLick={() => navigate("/form")}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
