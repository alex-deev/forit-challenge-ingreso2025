import express from 'express';
import cors from 'cors';
import TaskRouter from './routes/tasks.route';
import UnknownRouter from './routes/unknow.route';
import { InLogger, OutLogger } from './middlewares/logger.middleware';

const server = express();
const PORT = process.env.PORT || 3000;
server.use(cors());
server.use(express.json());

// Middlewares para loggear cada petición entrante y saliente
server.use(InLogger);
server.use(OutLogger);

// Endpoints para rutas de la funcionalidad CRUD de Tasks (tareas)
server.use('/api/tasks', TaskRouter);

// Endpoint para rutas no definidas
server.use(UnknownRouter);

// Inicialización del servidor express
server
  .listen(PORT, () => {
    console.log(`El servidor se está iniciando en el PUERTO ${PORT}...`);
  })
  .on('error', () => {
    console.error(`El servidor se detuvo! Verfica si el PUERTO ${PORT} está libre!`);
  });
