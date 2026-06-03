import jwt from "jsonwebtoken"
import { env } from "../../../config/env.service.js"

export const authMiddleware = (req, res, next) => {
    try{
        let { authorization } = req.headers
     if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        let token = authorization.split(" ")[1]  
        let decoded = jwt.verify(token, env.jwt_key)
        req.user = decoded
        next()
    }catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message })
    }
}