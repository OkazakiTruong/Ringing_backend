import express from 'express';
import authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authSchema, loginSchema } from '../consts/validate.const';
import { jwtMiddleware } from '../middlewares/jwt.middleware';
const router = express.Router();

router.post('/register', validate(authSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/verify-code', authController.verifyCode);
router.post('/change-password', jwtMiddleware, authController.changePassword);

export default router;
