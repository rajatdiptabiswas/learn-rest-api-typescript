import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import log from './logger';
import blogRoutes from './routes/blogRoutes';

const app: Application = express();
const port: number = (process.env.PORT) ? +process.env.PORT : 3000;
const dbURI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@googlecloudcluster.n5v9j.mongodb.net/blogs-db?retryWrites=true&w=majority`;

// middlewares
app.use(morgan('dev', {
  skip: (request: Request, response: Response) => process.env.NODE_ENV === 'production'
}));
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
app.get('/', (request: Request, response: Response) => {
  response.redirect('/blogs');
});

// blogs
app.use('/blogs', blogRoutes);

// 404
app.use((request: Request, response: Response) => {
  response.status(404).send('<h1>404</h1>Page Not Found :(');
});
