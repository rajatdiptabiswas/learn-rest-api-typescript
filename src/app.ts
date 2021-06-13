import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import log from './logger';
import config from './config/config';
import blogRoutes from './routes/blogRoutes';

const app: Application = express();

// middlewares
app.use(
  morgan('dev', {
    skip: (request: Request, response: Response) =>
      process.env.NODE_ENV === 'production',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
mongoose
  .connect(config.mongodb.url, config.mongodb.options)
  .then((result) => {
    log.info('Connected to MongoDB database');
    app.listen(config.server.port, () =>
      log.info(
        `Server running at http://${config.server.hostname}:${config.server.port}...`
      )
    );
  })
  .catch((error: Error) => {
    log.error(error);
    process.exit(1);
  });

// routes
// home
app.get('/', (request: Request, response: Response) => {
  response.redirect('/blogs');
});

// blogs
app.use('/api/blogs', blogRoutes);

// 404
app.use((request: Request, response: Response) => {
  response.status(404).send('<h1>404</h1>Page Not Found :(');
});
