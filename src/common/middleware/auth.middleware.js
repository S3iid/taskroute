import jwt from "jsonwebtoken"
import { env } from "../../../config/env.service.js"

export const authMiddleware = (req, res, next) => {
    try{
        let { authorization } = req.headers
     if (!authorization) {
            throw { statusCode: 401, message: "No token provided" }
        }
        let token = authorization.split(" ")[1]  
        let decoded = jwt.verify(token, env.jwt_key)
        req.user = decoded
        next()
    }catch (error) {
        next(error)
    }
}

export const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            throw { statusCode: 401, message: "User not authenticated" }
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw { statusCode: 403, message: "Access denied - insufficient permissions" }
        }
        next()
    }
}