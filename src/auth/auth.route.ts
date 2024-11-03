import express from 'express';
import { authRegister, authLogin } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/register', authRegister);
authRouter.post('/login', authLogin);

export default authRouter;