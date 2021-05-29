import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port: number = 3000;

app.get('/', (request: Request, response: Response) => {
  response.send("Hello World!");
});

app.listen(port, () => console.log(`Sever running on port ${port}...`));
