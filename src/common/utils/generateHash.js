
import bcrypt from "bcrypt"



export const generateHash = async(planText)=>{
let encrypteddata = await bcrypt.hash(planText,8)
return encrypteddata


}

export const compareHash = async(planText,cypherText)=>{
let isMatched = await bcrypt.compare(planText,cypherText)
return isMatched    


} 