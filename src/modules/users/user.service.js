import { compareHash, generateHash } from "../../common/utils/generateHash.js"
import usermodel from "../../database/models/user.model.js"
import { generatetoken } from "../../common/utils/token.js"
import { env } from "../../../config/env.service.js"  

export const appuser = async (data) => {
    if (!data) {
        throw new Error("Request body is required")
    }

    let { userName, email, password, phone } = data
    let hashedPassword = await generateHash(password)
    let addeduser = await usermodel.insertOne({ userName, email, password: hashedPassword, phone })
    if (addeduser) {
        return addeduser
    } else {
        return { message: "something incorrect" }
    }

}
export const login = async (data) => {
    if (!data) {
        throw new Error("Request body is required")
    }

    let { email, password } = data
    let userdata = await usermodel.findOne({ email })
    const isMatchedpassword = await compareHash(password, userdata.password)
    if (isMatchedpassword) {
        let token=await generatetoken({id:userdata._id})
        return { message: "user logged in ", token }

    } else {

        return { message: "password incorrect" }

    }


}

export const updateuser=async(id,data)=>{
let  updateduser =await usermodel.findByIdAndUpdate(id,data,{new:true})
if(updateduser){
return {message:"user updated",updateduser}
}else{
return {message:"usernot  found"}
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