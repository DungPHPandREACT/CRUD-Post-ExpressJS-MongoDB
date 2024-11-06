import mongoose from "mongoose";

export interface User {
    id?: mongoose.Types.ObjectId;
    username: string;
    email?: string;
    password?: string;
    role?: string; 
}