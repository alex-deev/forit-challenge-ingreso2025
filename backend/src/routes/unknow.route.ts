import { Request, Response, Router } from 'express';
const UnknownRouter = Router();

UnknownRouter.use((req: Request, res: Response) => {
  const msg = 'Aquí no hay nada! Intenta con http://localhost:3000/api/tasks';
  res.status(404).send(msg);
});

export default UnknownRouter;
