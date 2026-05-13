import jwt from "jsonwebtoken"
import { env } from "../../../config/env.service.js"

export const generatetoken = async (data) => {
    let token = await jwt.sign(data, env.jwtkey)
    return token

}