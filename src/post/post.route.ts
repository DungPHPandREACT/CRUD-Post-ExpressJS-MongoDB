import express from 'express';
import { createPost, deletePost, readPost, readPosts, updatePost } from './post.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const postRouter = express.Router();

postRouter.get('/', readPosts);
postRouter.get('/:id', readPost);
postRouter.post('/',authenticateToken, createPost);
postRouter.put('/:id',authenticateToken, updatePost);
postRouter.delete('/:id',authenticateToken, deletePost);

export default postRouter;
