import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../dtos/express.dto';
import { User } from '../dtos/user.dto';
import { users } from '../mock/users';
import { Role } from '../dtos/role.dto';
import postModel from '../post/post.model';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? '';

// viewer, editor, admin
const rolesApp: Record<string, Role> = {
	user: {
		name: 'user',
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
				id: user.id,
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
	const { id } = user;
	const roleUser = user.role;
	// roleUser = viewer
	if (!roleUser || !rolesApp[roleUser]?.permissions) {
		return res.status(403).json({
			message: 'Bạn không đủ truy cập vào chức năng này',
		});
	}

	// return res.status(200).json({
	// 	message: `Quyền của bạn là: ${rolesApp[roleUser]?.permissions}`,
	// });


	next();
};

export const checkOwnership = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
	try{
		const userId = req.user?.id ?? '';
		const postId = req.params.id;

		const post = await postModel.findOne({
			_id: postId
		})

		if(!post){
			return res.status(404).json({
				message: 'Bài viết không tồn tại'
			})
		}


		if(post.author.toString() !== userId.toString()){
			return res.status(403).json({
				message: 'Bạn không có quyền truy cập bài viết này'
			})
		}
		next();
	} catch(err){
		res.status(500).json({message: 'Lỗi máy chủ'})
	}
}