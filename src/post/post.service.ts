import mongoose from 'mongoose';
import { PostInsert } from './post.dto';
import postModel from './post.model';

export const createPostService = async (
	payload: PostInsert,
) => {
	const newPost = new postModel(payload);

	return await newPost.save();
};
