import mongoose from 'mongoose'
const { Schema } = mongoose

const postSchema = new Schema({
    title: String,
    body: String,
    createdAt: Date
})

export default mongoose.model('Post', postSchema)
