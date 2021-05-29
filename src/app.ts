import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Application = express();
const port: number = 3000;
const dbURI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@googlecloudcluster.n5v9j.mongodb.net/blogs-db?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => console.log(`Sever running on port ${port}...`))
  )
  .catch((error) => console.log(error));

app.get('/', (request: Request, response: Response) => {
  response.send('Hello World!');
});
