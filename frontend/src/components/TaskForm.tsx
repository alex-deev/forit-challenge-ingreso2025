import { useState } from "react";
import { Button } from "./Button";
import CompleteBadge from "./CompleteBadge";
import Checkbox from "./Checkbox";
import TextArea from "./TextArea";
import Input from "./Input";
import { truncString } from "../utils/common";
import type { Task } from "../models/Task.model";

type HandleCreateTask = (task: Task) => void;
type HandleUpdateTask = (task: Task) => void;
type HandleDeleteTask = (id: string) => void;
type HandleCancelOperation = () => void;

export default function TaskForm(props: {
  task?: Task;
  onCreateTask: HandleCreateTask;
  onUpdateTask: HandleUpdateTask;
  onDeleteTask: HandleDeleteTask;
  onCancelOperation: HandleCancelOperation;
}) {
  const { task, onCreateTask, onUpdateTask, onDeleteTask, onCancelOperation } = props;

  const titleMaxSize = 80;
  const descriptionMaxSize = 2000;

  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [completed, setCompleted] = useState<boolean>(task?.completed || false);

  function handleTitleEdition(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionEdition(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(event.target.value);
  }

  function handleCompletedEdition(event: React.ChangeEvent<HTMLInputElement>) {
    setCompleted(event.target.checked);
  }

  /** Crea o modifica una tarea. Si se provee una tarea como parámetro, devuleve la misma pero con title,
   *  description y completed actualizados. De otra forma, crea una tarea con valor por defecto. */
  function formulateTask(task?: Task) {
    const formTask: Task = {
      // existe task  ?  si, la actualiza  :  no, crea una nueva
      id: task ? task.id : "",
      title: truncString(title, titleMaxSize), // asegura que el titulo no exeda el largo máximo
      description: truncString(description, descriptionMaxSize), // asegura que la descripcion no exeda el largo máximo
      completed: completed,
      createdAt: task ? task.createdAt : new Date(),
    };
    return formTask;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!task) {
      const newTask = formulateTask();
      onCreateTask(newTask);
    } else {
      const updatedTask = formulateTask(task);
      onUpdateTask(updatedTask);
    }
  }

  function handleDelete() {
    onDeleteTask(`${task!.id}`)
  }

  if (!task) {
    // Si no se recibe una Task, se muestra el form para crear una nueva
    return (
      <section className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 text-left">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Crear una nueva tarea
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <Input
                className="sm:col-span-2"
                label="Título"
                placeholder="Ingrese un título"
                required={true}
                value={title}
                onChange={handleTitleEdition}
                maxLength={titleMaxSize}
              />
              <TextArea
                className="sm:col-span-2"
                label="Descripción"
                placeholder="Describe tu taréa aquí..."
                required={true}
                value={description}
                onChange={handleDescriptionEdition}
                maxLength={descriptionMaxSize}
              />
            </div>
            <div className="mt-8 flex gap-4 sm:gap-6 justify-between">
              <Button
                text="Cancelar"
                onCLick={onCancelOperation}
                type="button"
              />
              <Button text="Crear tarea" color="green" type="submit" />
            </div>
          </form>
        </div>
      </section>
    );
  } else {
    // Si se recibe una Task, se muetra el form para modificarla
    return (
      <section className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 text-left">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {`Modificar la tarea: ${task!.id}`}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <Input
                label="Título"
                placeholder="Ingrese un título"
                required={true}
                value={title}
                onChange={handleTitleEdition}
                maxLength={titleMaxSize}
              />
              <Checkbox
                label="Completar tarea?"
                checked={completed}
                onChange={handleCompletedEdition}
              >
                <div className="flex inline ms-8">
                  <CompleteBadge isCompleted={completed} />
                </div>
              </Checkbox>
              <TextArea
                className="sm:col-span-2"
                label="Descripción"
                placeholder="Describe tu taréa aquí..."
                required={true}
                value={description}
                onChange={handleDescriptionEdition}
                maxLength={descriptionMaxSize}
              />
            </div>
            <div className="mt-8 flex gap-4 sm:gap-6 justify-between">
              <Button
                text="Cancelar"
                onCLick={onCancelOperation}
                type="button"
              />
              <div className="flex gap-4">
                <Button
                  text="Eliminar tarea"
                  color="red"
                  onCLick={handleDelete}
                  type="button"
                />
                <Button text="Modificar tarea" color="green" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
