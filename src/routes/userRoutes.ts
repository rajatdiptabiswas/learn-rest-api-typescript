import { Router } from 'express';
import userController from '../controllers/userController';
import verifyJWT from '../middlewares/verifyJWT';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/validate', verifyJWT, userController.validateToken);

export default router;
