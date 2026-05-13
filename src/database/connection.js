import mongoose from "mongoose";
import { env } from "../../config/env.service.js"

export const databaseconnection = async () => {
    try {
        await mongoose.connect(env.databaseurl)
        console.log("database connected")
    }
    catch (error) {
        console.log("error", error)

    }
}