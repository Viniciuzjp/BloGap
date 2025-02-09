import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
    createdAt: { type: Date, default: Date.now }
})
export default mongoose.model('User', userSchema)