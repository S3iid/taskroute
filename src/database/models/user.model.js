import mongoose from "mongoose"
const userschema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true })
const usermodel = mongoose.model("user", userschema)

export default usermodel;