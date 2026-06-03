import { compareHash, generateHash } from "../../common/utils/generateHash.js"
import usermodel from "../../database/models/User.model.js"
import { generatetoken } from "../../common/utils/token.js"
import { env } from "../../../config/env.service.js"  


export const appuser = async (data) => {
    if (!data) {
        throw new Error("Request body is required")
    }

    let { fullName, email, password, phone } = data
     if (!password || password.length < 8) {
        return { message: "Password must be at least 8 characters" }
    }
    let hashedPassword = await generateHash(password)
    let addeduser = await usermodel.create({ fullName, email, password: hashedPassword, phone })
    if (addeduser) {
        return { success: true, message: "user created", addeduser }
    } else {
        return { success: false, message: "something incorrect" }
    }
}
export const login = async (data) => {
    if (!data) {
        throw new Error("Request body is required")   
    }
    let { email, password } = data
    let userdata = await usermodel.findOne({ email })
    if (!userdata) {
        return { success: false, message: "user not found" }
    }
    const isMatchedpassword = await compareHash(password, userdata.password)
    if (isMatchedpassword) {
        let token = await generatetoken({ id: userdata._id })
        return { success: true, message: "Login Success", token }
    } else {
        return { success: false, message: "password incorrect" }
    }


}

export const updateuser = async (id, data) => {
  let updateduser = await usermodel.findByIdAndUpdate(id, data, { returnDocument: 'after' })
  if (updateduser) {
    return { message: "user updated", updateduser }
  } else {
    return { message: "user not found" }
  }
}

export const deleteuser =async(id)=>{
let  deleteduser =await usermodel.findByIdAndDelete(id)
if(deleteduser){
return {message:"user deleted",deleteduser}
}else{
return {message:"usernot  found"}
}


}