import { Request, Response, Router } from 'express';

/** Enrutador para rutas comunes o de uso general */
const CommonRouter = Router();

/** Enrutador que atrapa cualquier ruta.
 * ATENCION: Este debe ser el ultimo router agredado a la applicación, debido a que debe escuchar cualquier otra ruta no especificada anteriormente. */
CommonRouter.all('/*splat', (req: Request, res: Response) => {
  const msg = 'Aquí no hay nada! Intenta con http://localhost:3000/api/tasks';
  res.status(404).send(msg);
});

export default CommonRouter;
