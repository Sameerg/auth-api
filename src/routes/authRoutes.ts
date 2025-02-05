import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { validateLogin, validateRegistration } from '../middleware/validate';

const router = Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;

