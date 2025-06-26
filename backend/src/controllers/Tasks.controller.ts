import { Request, Response } from 'express';
import { Task } from '../models/Task.model';

const tasks: Array<Task> = [];

/**
 * GET | devuelve todas las tareas en formato JSON.
 */
export function get(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(tasks));
}

/**
 * POST | crea una nueva Task. Requiere:
 * - `objeto JSON` en request body {id, title, description, completed, createdAt} 
 */
export function post(req: Request, res: Response) {
  const content = req.body;
  
  const newTask: Task = createTask(content, tasks.length.toString());
  tasks.push(newTask);
  res.send(tasks);
}

/**
 * PUT | actualiza una tarea existente. Requiere:
 * - `id` en request params
 * - `objeto JSON` en request body {id, title, description, completed, createdAt} 
 */
export function put(req: Request, res: Response) {
  const id = req.params.id;
  const content = req.body;

  const index = indexOfTask(id);
  const updatedTask: Task = createTask(content);
  tasks[index] = updatedTask;
  res.send(tasks);
}

/**
 * DELETE | elimina una terea existente. Requiere:
 * - `id` en request params
 * */
export function remove(req: Request, res: Response) {
  const id = req.params.id;

  const index = indexOfTask(id);
  tasks.splice(index, 1);
  res.send(tasks);
}

/**
 * Busca y deveulve la posición de la Task en el listado.
 */
function indexOfTask(id: string): number {
  const index = tasks.findIndex(task => task.id == id);
  if (index === -1) 
    throw new Error(`Task con id: ${id} no existe!`);
  return index;
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
