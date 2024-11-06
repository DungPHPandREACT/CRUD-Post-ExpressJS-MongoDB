import express from 'express';
import {
	authenticateToken,
	authorization,
    checkOwnership,
} from '../middlewares/auth.middleware';
import {
	createPost,
	deletePost,
	readPost,
	readPosts,
	updatePost,
} from './post.controller';

const postRouter = express.Router();

postRouter.get('/', readPosts);
postRouter.get('/:id', readPost);
postRouter.post('/', authenticateToken, createPost);
postRouter.put('/:id', authenticateToken, updatePost);
postRouter.delete('/:id', authenticateToken, authorization,checkOwnership, deletePost);

export default postRouter;
