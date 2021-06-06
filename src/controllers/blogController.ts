import { Request, Response } from 'express';
import log from '../logger';
import Blog from '../models/blogModel';

const createBlog = async (request: Request, response: Response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    return response.status(201).send(result);
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

const readAllBlogs = async (request: Request, response: Response) => {
  try {
    const result = await Blog.find().sort({ createdAt: -1 }).exec();
    return response.status(200).send(result);
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

const readBlogById = async (request: Request, response: Response) => {
  try {
    const result = await Blog.findById(request.params.id).exec();
    if (!result) {
      return response.status(404).send('Blog Not Found :(');
    }
    return response.status(200).send(result);
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

const partialUpdateBlogById = async (request: Request, response: Response) => {
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true }).exec();
    if (!result) {
      return response.status(404).send('Blog Not Found :(');
    }
    return response.status(200).send(result);
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

const deleteBlogById = async (request: Request, response: Response) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id).exec();
    if (!result) {
      return response.status(404).send('Blog Not Found :(');
    }
    return response.status(200).send(result);
  } catch (error) {
    log.error(error);
    return response.status(500).send(error.message);
  }
};

export default {
  createBlog,
  readAllBlogs,
  readBlogById,
  partialUpdateBlogById,
  deleteBlogById,
};
