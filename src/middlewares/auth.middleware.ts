import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../dtos/express.dto';
import { User } from '../dtos/user.dto';
import { users } from '../mock/users';
import { Role } from '../dtos/role.dto';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? '';

// viewer, editor, admin
const roles = ['viewer', 'editor', 'admin'];
const rolesApp: Record<string, Role> = {
	admin: {
		name: 'admin',
		permissions: ['create', 'update', 'read', 'delete'],
	},
	editor: {
		name: 'editor',
		permissions: ['create', 'update', 'read', 'delete'],
	},
	viewer: {
		name: 'viewer',
		permissions: ['read'],
	},
};

export const authenticateToken = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers['authorization']?.split(' ')[1];
	if (token) {
		jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
			if (err) {
				res.status(403).json({
					message: 'Forbidden',
				});
			}

			req.user = {
				id: user.userId,
				role: user.role,
				username: user.username,
				email: user.email,
			};
			next();
		});
	} else {
		res.status(401).json({
			message: 'Bạn chưa đăng nhập',
		});
	}
};

export const authorization = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
): any => {
	const user: User = req.user as User;
	console.log('user: ', user)
	const roleUser = user.role;
	// roleUser = viewer
	if (!roleUser || !roles.includes(roleUser)) {
		return res.status(403).json({
			message: 'Bạn không đủ truy cập vào chức năng này',
		});
	}

	return res.status(200).json({
		message: `Quyền của bạn là: ${rolesApp[roleUser].permissions}`,
	});
	// next();
};
