import express from "express"
import { env } from '../config/env.service.js'
import { databaseconnection } from "./database/connection.js"
import userrouter from "./modules/users/user.controller.js"
import postrouter from "./modules/posts/post.controller.js"
export const bootstrap = () => {
    const app = express()
    app.use(express.json())
    app.use('/users', userrouter)
    app.use('/posts', postrouter)
    databaseconnection()
    app.get('/helath_check', (req, res) => {
        res.json({ status: "ok", message: "healthcheck done" })
    })
    app.listen(env.port, () => {
        console.log("server is running")
    })
}