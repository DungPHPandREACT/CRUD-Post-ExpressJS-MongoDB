import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './auth.dto';
import userModel from './auth.model';
dotenv.config();

export const authRegister = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const user: User = req.body;
		const { email, password, username } = user;

		const existingUser = await userModel.findOne({
			email,
		});

		if (existingUser) {
			return res.status(400).json({
				status: 'error',
				message: 'Email đã được đăng ký',
			});
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = new userModel({
			email,
			username,
			password: passwordHash,
			role: 'user',
		});

		await newUser.save();

		res.status(201).json({ status: 'success', message: 'Đăng ký thành công' });
	} catch (err: any) {
		res.status(500).json({
			status: 'error',
			message: 'Đã xảy ra vấn đề trong quá trình đăng ký',
		});
	}
};

export const authLogin = async (req: Request, res: Response): Promise<any> => {
	try {
		const payload: User = req.body;
		const { email, password } = payload;

		const SECRET_KEY: string = process.env.SECRET_KEY || '';

		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(400).json({
				stauts: 'error',
				message: 'Email không đúng',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				status: 'error',
				message: 'Mật khẩu không đúng',
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
                role: user.role,
                username: user.username
			},
			SECRET_KEY,
			{ expiresIn: '1h' }
		);

		res
			.status(200)
			.json({ status: 'success', message: 'Đăng nhập thành công', token });
	} catch (err) {
		res
			.status(500)
			.json({
				status: 'error',
				message: 'Xảy ra lỗi trong quá trình đăng nhập',
			});
	}
};
