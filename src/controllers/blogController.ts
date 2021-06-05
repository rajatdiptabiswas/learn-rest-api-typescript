import { Request, Response } from 'express';
import log from '../logger';
import Blog from '../models/blogs';

const createBlog = (request: Request, response: Response) => {
  const blog = new Blog(request.body);
  
  blog.save()
    .then((result) => {
      response.status(201).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
};

const readAllBlogs = (request: Request, response: Response) => {
  Blog.find().sort({ createdAt : -1 })
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
};

const readBlogById = (request: Request, response: Response) => {
  Blog.findById(request.params.id)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
};

const partialUpdateBlogById = (request: Request, response: Response) => {
  Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
};

const deleteBlogById = (request: Request, response: Response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error: Error) => {
      log.error(error);
      response.status(500).send(error.message);
    });
};

export default {
  createBlog,
  readAllBlogs,
  readBlogById,
  partialUpdateBlogById,
  deleteBlogById,
};
