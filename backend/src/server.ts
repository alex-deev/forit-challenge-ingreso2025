import express, { Request, Response } from "express";
const server = express();

server.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
});

server.listen(3000, () => {
  console.log("Servidor ejecutandose en el Puerto 3000...");
});
