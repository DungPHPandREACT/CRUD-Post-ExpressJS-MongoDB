import { Request, Response } from 'express';
import { CustomRequest } from '../dtos/express.dto';
import { Post } from './post.dto';
import postModel from './post.model';

export const createPost = async (req: CustomRequest, res: Response) => {
	try {
		const payload: Post = req.body;
		const { title, description, content } = payload;
		const author = req.user?.id;

		const newPost = new postModel({
			title,
			description,
			content,
			author,
		});

		const response = await newPost.save();

		res.status(201).json({
			statue: 'success',
			message: 'Tạo bài viết thành công',
			data: response,
		});
	} catch (err) {
		res.status(500).json({
			statue: 'error',
			message: 'Tạo bài viết không thành công',
		});
	}
};

export const readPosts = async (req: Request, res: Response) => {
	try {
		const posts = await postModel.find().populate('author', 'username email');

		res.status(200).json({ status: 'success', data: posts });
	} catch (err) {
		res.status(500).json({
			statue: 'error',
			message: 'Không thể lấy được danh sách bài viết',
		});
	}
};

export const readPost = async (req: Request, res: Response) => {
	res.status(200).json({ message: 'Read a post success' });
};

export const updatePost = async (req: Request, res: Response) => {
	res.status(200).json({ message: 'Update post success' });
};

export const deletePost = async (req: Request, res: Response) => {
	res.status(200).json({ message: 'Delete post success' });
};
