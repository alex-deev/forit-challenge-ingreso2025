import { useContext } from "react";
import TaskTable from "../components/TaskTable";
import { TasksContext } from "../contexts/TasksContext";

export default function TaskList() {
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) {
    return <span>NO HAY DATOS!</span>
  } else {
    return (
      <>
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tareas
        </h2>
        <TaskTable tasks={tasksContext.tasks} />
      </>
    );
  }
}
