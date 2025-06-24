import express, { NextFunction, Request, Response } from 'express';
import TaskRouter from './routes/tasks.route';
import UnknownRouter from './routes/unknow.route';

const server = express();
const PORT = 3000;
server.use(express.json())

// Endpoints para rutas de la funcionalidad CRUD de Tasks (tareas)
server.use('/api/tasks', TaskRouter);

// Endpoint para rutas no definidas
server.use(UnknownRouter);

// Inicialización del servidor express
server.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el Puerto ${PORT}...`);
});
