import mongoose, { mongo } from "mongoose";

export interface Post{
    title: string;
    content: string;
    description: string;
}

export interface PostInsert extends Post{
    author: mongoose.Types.ObjectId
}