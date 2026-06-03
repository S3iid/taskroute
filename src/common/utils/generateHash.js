
import bcrypt from "bcrypt"
import {env } from '../../../config/env.service.js';


export const generateHash = async(planText,SALT)=>{
let encrypteddata = await bcrypt.hash(planText,Number(env.SALT))
return encrypteddata


}

export const compareHash = async(planText,cypherText)=>{
let isMatched = await bcrypt.compare(planText,cypherText)
return isMatched    
} 