import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../dtos/express.dto';
import { User } from '../dtos/user.dto';
import { users } from '../mock/users';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? '';

const refreshTokens: string[] = [];

export const authRegister = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const passwordHash = await bcrypt.hash(password, 10);

	const newUser: User = {
		id: users.length + 1,
		username,
		password: passwordHash,
	};

	console.log(newUser);

	users.push(newUser);

	res.status(201).json({
		message: 'Đăng ký thành công',
	});
};

export const authLogin = async (req: Request, res: Response): Promise<any> => {
	const { username, password } = req.body;
	console.log('SECRET_KEY: ', SECRET_KEY);

	if (!username.trim()) {
		res.status(401).json({
			message: 'Thông tin username chưa hợp lệ',
		});
	}

	if (!password.trim() || password.lengh < 6) {
		res.status(401).json({
			message: 'Thông tin password chưa hợp lệ',
		});
	}

	const userCurrent = users.find((user) => user.username === username);
    console.log('userCurrent: ', userCurrent);
	if (!userCurrent) {
		return res.status(401).json({
			message: 'Đăng nhập không thành công',
		});
	}

	let isMatchPassword = true;
	if (userCurrent?.password) {
		isMatchPassword = await bcrypt.compare(password, userCurrent?.password);
		console.log('isMatchPassword: ', isMatchPassword);
	}

	const token = jwt.sign({id: userCurrent.id,role: userCurrent.role, username, email: userCurrent.email }, SECRET_KEY, {
		expiresIn: '1h',
	});
	const refreshToken = jwt.sign(
		{ username, email: userCurrent.email },
		SECRET_KEY
	);

	refreshTokens.push(refreshToken);
	return res.status(200).json({
		message: 'Đăng nhập thành công',
		data: userCurrent,
		token,
		refreshToken,
	});
};

export const authProtected = (req: CustomRequest, res: Response) => {
	const user = req.user;

	res.json({
		message: 'Đã đăng nhập',
		user,
	});
};

export const authToken = (req: CustomRequest, res: Response): any => {
	const { token } = req.body;

	if (!token || !refreshTokens.includes(token)) {
		return res.status(403).json({
			message: 'Forbidden',
		});
	}

	jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
		if (err) {
			res.status(403).json({
				message: 'Forbidden',
			});
		}

		const newToken = jwt.sign(
			{
				username: user.username,
				email: user.email,
			},
			SECRET_KEY,
			{ expiresIn: '15m' }
		);

		res.json({
			token: newToken,
		});
	});
};
