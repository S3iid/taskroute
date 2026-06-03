import { Router } from 'express'
import { login, appuser, deleteuser, updateuser } from "./auth.service.js"
import { authMiddleware } from "../../common/middleware/auth.middleware.js"

const router = Router()

router.post('/signup', async (req, res, next) => {
    try {
        console.log("Request body:", req.body)
        let addeduser = await appuser(req.body)
        res.json(addeduser)
    } catch (error) {
        next(error)
    }
})


router.post('/login', async (req, res, next) => {
    try {
        let addeduser = await login(req.body)
        res.json(addeduser)
    } catch (error) {
        next(error)
    }
})


router.get('/get-user-by-id', (req, res) => {

})


router.patch('/updateuserbyid/:id', authMiddleware, async (req, res, next) => {
    try {
        let updateduser = await updateuser(req.params.id, req.body)
        res.json(updateduser)
    } catch (error) {
        next(error)
    }
})
router.delete('/deleteuserbyid/:id', authMiddleware, async (req, res, next) => {
    try {
        let deleteduser = await deleteuser(req.params.id)
        res.json(deleteduser)
    } catch (error) {
        next(error)
    }
})

export default router;