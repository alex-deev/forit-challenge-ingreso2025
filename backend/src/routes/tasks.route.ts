import { Router } from 'express';
import { get, post, put, remove } from '../controllers/Tasks.controller';

const TaskRouter = Router();

// Endpoint pars obtener todas las tareas
TaskRouter.get('/', get);

// Endpoint para crear una nueva tarea
TaskRouter.post('/', post);

// Endpoint para actualizar una tarea existente
TaskRouter.put('/:id', put);

// Enpoint para eliminar una tarea existente
TaskRouter.delete('/:id', remove);

export default TaskRouter;
