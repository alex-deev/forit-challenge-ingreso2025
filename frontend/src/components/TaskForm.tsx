import { useState } from "react";
import type { Task } from "../models/Task.model";
import { truncString } from "../utils/common";
import { Button } from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import { useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import CompleteBadge from "./CompleteBadge";
import { API_BASE_URL } from "../contexts/TasksContext";


export default function TaskForm(props: { task?: Task }) {
  const { task } = props;
  const navigate = useNavigate();

  const titleMaxSize = 80;
  const descriptionMaxSize = 2000;

  const [title, setTitle] = useState<string>(
    task?.title || ""
  );
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [completed, setCompleted] = useState<boolean>(
    task?.completed || false
  );


  function handleTitleEdition(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  
  function handleDescriptionEdition(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(event.target.value);
  }
  
  function handleCompletedEdition(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setCompleted(event.target.checked);
  }

  /** Crea o modifica una tarea. Si se provee una tarea como parámetro, devuleve la misma pero con title,
   *  description y completed actualizados. De otra forma, crea una tarea con valor por defecto. */
  function formulateTask(task?: Task) {
    const formTask: Task = {
      // existe task  ?  si, la actualiza  :  no, crea una nueva
      id: task ? task.id : "",
      title: truncString(title, titleMaxSize),  // asegura que el titulo no exeda el largo máximo
      description: truncString(description, descriptionMaxSize),  // asegura que la descripcion no exeda el largo máximo
      completed: task ? task.completed : false,
      createdAt: task ? task.createdAt : new Date(),
    };
    return formTask;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!task) {
      const newTask = formulateTask();
      fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }).then((res) => {
        console.log(`-> POST status: ${res.statusText}`);
        navigate(`/`);
      });
    } else {
      const newTask = formulateTask(task)
      fetch(`${API_BASE_URL}/tasks/${task!.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }).then((res) => {
        console.log(`-> PUT status: ${res.statusText}`);
        navigate(`/item/${task!.id}`);
      });
    }
  }
  
  function handleDelete() {
    fetch(`${API_BASE_URL}/tasks/${task!.id}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(`-> DELETE status: ${res.statusText}`);
      navigate("/");
    });
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
                onCLick={() => navigate("/")}
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
                onCLick={() => navigate(`/item/${task!.id}`)}
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
