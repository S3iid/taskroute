import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('./config/.env') })
console.log(process.env.PORT, "from env file")
const port = process.env.PORT
const databaseurl = process.env.DATABASEURL
const jwtkey = process.env.JWTKEY
export const env = {
    port,
    databaseurl,
    jwtkey
}