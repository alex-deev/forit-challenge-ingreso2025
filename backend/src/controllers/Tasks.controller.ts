import { Request, Response } from 'express';
import { Task } from '../models/Task.model';
import { deleteTask, getTasks, insertTask, updateTask } from '../database/statements';

/**
 * GET | devuelve todas las tareas en formato JSON.
 */
export function get(req: Request, res: Response) {
  const tasksJson = JSON.stringify(getTasks());
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(tasksJson);
}

/**
 * POST | crea una nueva Task. Requiere:
 * - `objeto JSON` en request body {id, title, description, completed, createdAt} 
 */
export function post(req: Request, res: Response) {
  const content = req.body;
  
  const newTask: Task = createTask(content);
  insertTask(newTask);

  res.sendStatus(200);
}

/**
 * PUT | actualiza una tarea existente. Requiere:
 * - `id` en request params
 * - `objeto JSON` en request body {id, title, description, completed, createdAt} 
 */
export function put(req: Request, res: Response) {
  const id = req.params.id;
  const content = req.body;

  const updatedTask: Task = createTask(content, id);
  updateTask(updatedTask);

  res.sendStatus(200);
}

/**
 * DELETE | elimina una terea existente. Requiere:
 * - `id` en request params
 * */
export function remove(req: Request, res: Response) {
  const id = req.params.id;

  deleteTask(id);
  
  res.sendStatus(200);
}

/**
 * Devuelve un objeto tipo Task a partir de un objeto JSON.
 */
function createTask(json: any, newId?: string): Task {
  const { id, title, description, completed, createdAt } = json;
  if (
    id === undefined ||
    title === undefined ||
    description === undefined ||
    completed === undefined ||
    createdAt === undefined
  ) {
    throw new Error(`Se esperaba una Task: {id,title,description,completed,createdAt}`);
  }
  const actualId = newId ? newId : id;
  const actualDate = new Date();
  return { id: actualId, title, description, completed, createdAt: actualDate };
}
