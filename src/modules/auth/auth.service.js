import { compareHash, generateHash } from "../../common/utils/generateHash.js"
import usermodel from "../../database/models/User.model.js"
import { generatetoken } from "../../common/utils/token.js"
import { env } from "../../../config/env.service.js"  


export const appuser = async (data) => {
    if (!data) {
        throw { statusCode: 400, message: "Request body is required" }
    }

    let { fullName, email, password, phone, role = 'user' } = data
     if (!password || password.length < 8) {
        throw { statusCode: 400, message: "Password must be at least 8 characters" }
    }
    if (!['user', 'admin'].includes(role)) {
        throw { statusCode: 400, message: "Role must be 'user' or 'admin'" }
    }
    let hashedPassword = await generateHash(password)
    let addeduser = await usermodel.create({ fullName, email, password: hashedPassword, phone, role })
    if (addeduser) {
        return { success: true, message: "user created", addeduser }
    } else {
        throw { statusCode: 500, message: "Failed to create user" }
    }
}
export const login = async (data) => {
    if (!data) {
        throw { statusCode: 400, message: "Request body is required" }   
    }
    let { email, password } = data
    let userdata = await usermodel.findOne({ email })
    if (!userdata) {
        throw { statusCode: 404, message: "user not found" }
    }
    const isMatchedpassword = await compareHash(password, userdata.password)
    if (isMatchedpassword) {
        let token = await generatetoken({ id: userdata._id, role: userdata.role })
        return { success: true, message: "Login Success", token }
    } else {
        throw { statusCode: 401, message: "password incorrect" }
    }


}

export const updateuser = async (id, data) => {
  let updateduser = await usermodel.findByIdAndUpdate(id, data, { returnDocument: 'after' })
  if (updateduser) {
    return { message: "user updated", updateduser }
  } else {
    throw { statusCode: 404, message: "user not found" }
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