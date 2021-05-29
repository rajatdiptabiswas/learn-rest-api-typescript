import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Blog } from './models/blogs';

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
  response.redirect('/all-blogs');
});

app.get('/add-blog', (request: Request, response: Response) => {
  const blog = new Blog({
    title: 'My Blog',
    author: 'Me',
    content: 'Hello World!',
  });

  blog.save()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/all-blogs', (request: Request, response: Response) => {
  Blog.find()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/single-blog', (request: Request, response: Response) => {
  Blog.findById('60b252de3f4c983931e03186')
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
