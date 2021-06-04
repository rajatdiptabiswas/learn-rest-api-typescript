import { Request, Response, Router } from 'express';
import log from '../logger';
import Blog from '../models/blogs';

const router = Router();

// create
// POST
router.post('/add', (request: Request, response: Response) => {
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
router.get('/', (request: Request, response: Response) => {
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
router.get('/:id', (request: Request, response: Response) => {
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
router.patch('/:id', (request: Request, response: Response) => {
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
router.put('/:id', (request: Request, response: Response) => {
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
router.delete('/:id', (request: Request, response: Response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
});

export default router;
