import mongoose from 'mongoose'
const { Schema } = mongoose

const postSchema = new Schema({
    title: String,
    body: String,
    category: String,
    author: String,
    authorEmail: String,
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Post', postSchema)
