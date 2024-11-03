import mongoose, { Document, Schema } from "mongoose";

interface User extends Document{
    username: string;
    password: string;
    email: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, required: true}
}, { timestamps: true })

export default mongoose.model<User>('User', UserSchema)