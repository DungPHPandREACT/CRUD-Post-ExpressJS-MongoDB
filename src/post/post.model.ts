import mongoose, { Document, Schema } from 'mongoose';

interface Post extends Document {
	title: string;
	description: string;
	content: string;
	author: mongoose.Types.ObjectId;
}

const PostSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

export default mongoose.model<Post>('Post', PostSchema);
