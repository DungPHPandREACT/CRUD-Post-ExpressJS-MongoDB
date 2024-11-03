import express, { Request, Response, NextFunction } from 'express';
import { authProtected, authToken, authLogin, authRegister } from './controllers/auth.controller';
import { authenticateToken, authorization } from './middlewares/auth.middleware';

import authRouter from './auth/auth.route';
import postRouter from './post/post.route';


const app = express();
app.use(express.json());

// app.post('/login', authLogin);
// app.post('/register',authRegister )
// app.get('/protected',authenticateToken,authorization, authProtected)
// app.post('/token', authToken)

app.use('/', authRouter);
app.use('/api/v1/post', postRouter);


const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
