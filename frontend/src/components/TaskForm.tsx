import { useState } from "react";
import type { Task } from "../models/Task.model";
import { Button } from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import { useNavigate } from "react-router-dom";

export default function TaskForm(props: { isNew: boolean; task?: Task }) {
  const { isNew, task } = props;
  const navigate = useNavigate();

  const [titleEdit, setTitleEdit] = useState<string>(task?.title || '');
  const [descriptionEdit, setDescriptionEdit] = useState<string>(task?.description || '');

  function handleTitleEdition(event: React.ChangeEvent<HTMLInputElement>) {
    setTitleEdit(event.target.value);
  }
  function handleDescriptionEdition(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescriptionEdit(event.target.value)
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const taskEdit: Task = {
      id: isNew ? '' : task!.id,
      title: titleEdit,
      description: descriptionEdit,
      completed: isNew ? false : task!.completed,
      createdAt: isNew ? new Date() : task!.createdAt
    } 
    
    fetch(`http://localhost:3000/api/tasks/${task!.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskEdit),
    }).then((res) => {
      console.log(`-> PUT status: ${res.statusText}`);
      navigate(`/item/${task!.id}`);
    });
  }

  return (
    <section className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 text-left">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {isNew ? "Crear una nueva tarea" : `Modificar la tarea: ${task!.id}`}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <Input
              className="sm:col-span-2"
              label="Título"
              placeholder="Ingrese un título"
              required={true}

              value={titleEdit}
              onChange={handleTitleEdition}
            />
            <TextArea
              className="sm:col-span-2"
              label="Descripción"
              placeholder="Describe tu taréa aquí..."
              required={true}

              value={descriptionEdit}
              onChange={handleDescriptionEdition}
            />
          </div>
          <div className="mt-8 flex gap-4 sm:gap-6 justify-between">
            <Button
              text="Cancelar"
              color="red"
              onCLick={() => isNew ? navigate('/') : navigate(`/item/${task!.id}`)}
              type="button"
            />
            <Button
              text={isNew ? "Crear tarea" : "Modificar tarea"}
              color="green"
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
