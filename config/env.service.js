import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('./config/.env') })
console.log(process.env.PORT, "from env file")
const port = process.env.PORT
const databaseurl = process.env.DATABASEURL
const jwt_key = process.env.JWT_KEY
const SALT=  process.env.SALT
const mood = process.env.MOOD


export const env = {
    port,
    databaseurl,
    jwt_key,
    SALT,
    mood
}