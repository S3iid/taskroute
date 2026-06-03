import express from "express"
import { env } from '../config/env.service.js'
import { databaseconnection } from "./database/connection.js"
import userrouter from "./modules/auth/auth.controller.js"
import bookrouter from "./modules/booking/booking.controller.js"
import { globalhandlingerror } from "./common/response/response.error.js"
import { sucessResponse } from "./common/response/sucess.response.js"

export const bootstrap = () => {
    const app = express()
    app.use(express.json())
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            return res.status(400).json({ success: false, message: 'Invalid JSON payload' })
        }
        next(err)
    })
    app.use("/api/users", userrouter)
    app.use("/api/bookings", bookrouter)
    databaseconnection()
    app.get('/health_check', (req, res) => {
        res.json({ status: "ok", message: "healthcheck done" })
    })


    app.get('/test', (req, res) => {
     sucessResponse({
        res,
         message: "test route working fine" ,
        status: 200,
        data: { name: "route assignment backend" ,age: 1 }
      })  
    })

    app.use((req, res) => {
        res.status(404).json({ message: "url not found" })
    })

    app.use(globalhandlingerror)

    app.listen(env.port, () => {
        console.log("server is running")
    })
}