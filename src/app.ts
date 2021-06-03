import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import log from './logger';
import Blog from './models/blogs';

const app: Application = express();
const port: number = (process.env.PORT) ? +process.env.PORT : 3000;
const dbURI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@googlecloudcluster.n5v9j.mongodb.net/blogs-db?retryWrites=true&w=majority`;

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((result) => {
    log.info('Connected to MongoDB database');
    app.listen(port, () => log.info(`Server running at http://localhost:${port}...`));
  })
  .catch((error: Error) => {
    log.error(error);
    process.exit(1);
  });

// routes
// home
// GET
app.get('/', (request: Request, response: Response) => {
  response.redirect('/blogs/all');
});

// create
// POST
app.post('/blogs/add', (request: Request, response: Response) => {
  const blog = new Blog(request.body);
  
  blog.save()
    .then((result) => {
      response.status(201).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
});

// read all
// GET
app.get('/blogs/all', (request: Request, response: Response) => {
  Blog.find().sort({ createdAt : -1 })
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
});

// read single
// GET
app.get('/blogs/:id', (request: Request, response: Response) => {
  Blog.findById(request.params.id)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
});

// update single
// PATCH
app.patch('/blogs/:id', (request: Request, response: Response) => {
  Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
});

// update single
// PUT
app.put('/blogs/:id', (request: Request, response: Response) => {
  Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, overwrite: true })
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
});

// delete single
// DELETE
app.delete('/blogs/:id', (request: Request, response: Response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
});
