import jwt from "jsonwebtoken"
import { env } from "../../../config/env.service.js"

export const authMiddleware = (req, res, next) => {
    try{let { authorization } = req.headers
     if (!authorization) {
            return res.status(401).json({ message: "token is required" })
        }
   let token = authorization.split(" ")[1]  // extract token after "Bearer "
        let decoded = jwt.verify(token, env.jwtkey)
        req.user = decoded
        next()
    }catch (error) {
        res.status(401).json({ message: "invalid token", error: error.message })
    }
}