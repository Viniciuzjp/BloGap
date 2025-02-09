import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
    author: { type: String, required: true },
    body: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Comment', commentSchema)