import express from 'express';
import { createPost, deletePost, readPost, readPosts, updatePost } from './post.controller';

const postRouter = express.Router();

postRouter.get('/', readPosts);
postRouter.get('/:id', readPost);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
