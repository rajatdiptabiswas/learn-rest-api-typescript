import { Router } from 'express';
import blogController from '../controllers/blogController';

const router = Router();

router.post('/add', blogController.createBlog);
router.get('/', blogController.readAllBlogs);
router.get('/:id', blogController.readBlogById);
router.patch('/:id', blogController.partialUpdateBlogById);
router.delete('/:id', blogController.deleteBlogById);

export default router;
