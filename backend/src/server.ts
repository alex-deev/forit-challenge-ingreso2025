import express, { NextFunction, Request, Response } from 'express';
import TaskRouter from './routes/tasks.route';
import UnknownRouter from './routes/unknow.route';

const server = express();

// Endpoints para rutas de la funcionalidad CRUD de Tasks (tareas)
server.use('/api/tasks', TaskRouter);

// Endpoint para rutas no definidas
server.use(UnknownRouter);

// Inicialización del servidor express
server.listen(3000, () => {
  console.log('Servidor ejecutandose en el Puerto 3000...');
});
