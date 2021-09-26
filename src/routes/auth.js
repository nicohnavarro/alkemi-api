import { Router } from 'express';
import { login, register } from '../controllers/auth.js';
import { postLoginRequestValidations, postRegisterRequestValidations } from '../middlewares/auth/index.js';

const router = Router();
 
router.post('/login',postLoginRequestValidations,login);
router.post('/register',postRegisterRequestValidations,register);

export default router;
