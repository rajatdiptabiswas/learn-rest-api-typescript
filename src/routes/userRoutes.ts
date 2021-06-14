import { Router } from 'express';
import userController from '../controllers/userController';
import extractJWT from '../middlewares/extractJWT';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/validate', extractJWT, userController.validateToken);

export default router;
