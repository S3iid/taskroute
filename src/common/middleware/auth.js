import jwt from "jsonwebtoken"
import { env } from "../../../config/env.service.js"

export const authMiddleware = (req, res, next) => {
    let { authorization } = req.headers
    let decoded = jwt.verify(authorization, env.jwtkey)

    req.user = decoded
    next()
}