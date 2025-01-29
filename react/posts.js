import mongoose from 'mongoose'
const { Schema } = mongoose

const postSchema = new Schema({
    title: String,
    body: String,
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Post', postSchema)
