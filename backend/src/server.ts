import express from 'express';
import cors from 'cors';
import TaskRouter from './routes/tasks.route';
import CommonRouter from './routes/common.router';
import { inLogger, outLogger } from './middlewares/logger.middleware';
import { createTasksTable } from './database/statements';

const PORT = process.env.APP_PORT || 3000;
const server = express();
server.use(cors());
server.use(express.json());

// Middlewares para loggear cada petición entrante y saliente
server.use(inLogger);
server.use(outLogger);

// Endpoints para rutas de la funcionalidad CRUD de Tasks (tareas)
server.use('/api/tasks', TaskRouter);

// Endpoint para rutas no definidas
server.use(CommonRouter);

// Inicialización del servidor express
server
  .listen(PORT, () => {
    console.log(`El servidor se está iniciando en el PUERTO ${PORT}...`);
    createTasksTable();
  })
  .on('error', () => {
    console.error(`El servidor se detuvo! Verfica si el PUERTO ${PORT} está libre!`);
  });
