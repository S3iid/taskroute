import jwt from "jsonwebtoken"
import { env } from "../../../config/env.service.js"

export const generatetoken = async (data) => {
    const token = jwt.sign(data, env.jwt_key)
    return token
}
