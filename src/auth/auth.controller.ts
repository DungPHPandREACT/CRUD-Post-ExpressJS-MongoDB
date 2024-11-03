import { Request, Response } from 'express';
import { User } from './auth.dto';
import userModel from './auth.model';
import bcrypt from 'bcrypt';

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
			return res.status(404).json({
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
        res.status(500).json({ status: 'error', message: 'Đã xảy ra vấn đề trong quá trình đăng ký' });
    }
};

export const authLogin = (req: Request, res: Response) => {
	res.status(200).json({ message: 'Login success' });
};
