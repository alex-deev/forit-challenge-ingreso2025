import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useContext } from "react";
import { TasksContext, type TasksContextType } from "../contexts/TasksContext";
import type { Task } from "../models/Task.model";
import { useNavigate } from "react-router-dom";


/** Página donde se pueden crear, actualizar o eliminar Tareas */
export default function TaskData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, postData, putData, deleteData } = useContext(TasksContext) as TasksContextType;
  const currentTask = findTask(id);

  function findTask(id: string | undefined): Task | undefined {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return undefined;
    }
    return tasks[index];
  }

  function onCreateTask(task: Task) {
    postData(task); // Envía la nueva tarea al backend para guardarla
    navigate(`/`); // Despues de crear la tarea vuelve al listado completo de tareas
  }
  function onUpdateTask(task: Task) {
    putData(task); // Envía la tarea al backend para actualizarla
    navigate(`/item/${task!.id}`); // Despues de actualizar la tarea, vuleve mostrar su invormación detallada
  }
  function onDeleteTask(id: string) {
    deleteData(id); // Envía una peticion al backend para eliminar la tarea
    navigate(`/`); // Despues de eliminar la tarea vuelve al listado completo de tareas
  }
  function onCancel() {
    // Cancela la operación y vuelve a la pagina anterior
    // Si estaba en el formulario de modificacipon, vuelve a mostrar su info detallada
    // Si no, vuelve al listado de tareas
    currentTask ? navigate(`/item/${currentTask.id}`) : navigate(`/`);
  }

  return (
    <>
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Tarea
      </h2>
      <TaskForm task={currentTask} onCreateTask={onCreateTask} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} onCancelOperation={onCancel} />
    </>
  );
}
