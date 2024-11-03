import { Request, Response } from 'express';

export const createPost = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Create post success' });
}

export const readPosts = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Read posts success' });
}

export const readPost = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Read a post success' });
}

export const updatePost = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Update post success' });
}

export const deletePost = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Delete post success' });
}