import express, { Request, Response, NextFunction } from 'express';
import { authProtected, authToken, authLogin, authRegister } from './controllers/auth.controller';
import { authenticateToken, authorization } from './middlewares/auth.middleware';
import dotenv from 'dotenv';
import authRouter from './auth/auth.route';
import postRouter from './post/post.route';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());

// app.post('/login', authLogin);
// app.post('/register',authRegister )
// app.get('/protected',authenticateToken,authorization, authProtected)
// app.post('/token', authToken)

app.use('/', authRouter);
app.use('/api/v1/post', postRouter);


const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/Post-Management";

const connectDB = async() => {
	try{
		await mongoose.connect(DATABASE_URL)
		console.log('Kết nối đến MongoDB thành công');
	} catch (error){
		console.log('Kết nối đến MongoDB thất bại');
		console.log(error);
	}
}

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
