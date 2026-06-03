import { Router } from 'express'
import { login, appuser, deleteuser, updateuser } from "./auth.service.js"
import { authMiddleware } from "../../common/middleware/auth.middleware.js"

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        console.log("Request body:", req.body)
        let addeduser = await appuser(req.body)
        res.json(addeduser)


    } catch (error) {
        console.error(" error:", error)
        res.status(500).json({ message: "error catched", error: error.message })
    }


})


router.post('/login', async (req, res) => {
    try {
        let addeduser = await login(req.body)
        res.json(addeduser)

    } catch (error) {
        console.error(" error:", error)
        res.status(500).json({ message: "error catched", error: error.message })
    }

})


router.get('/get-user-by-id', (req, res) => {

})


router.patch('/updateuserbyid/:id', authMiddleware, async (req, res) => {
    let updateduser = await updateuser(req.params.id, req.body)
    res.json(updateduser)
})
router.delete('/deleteuserbyid/:id', authMiddleware, async (req, res) => {
    let deleteduser = await deleteuser(req.params.id)
    res.json(deleteduser)
})

export default router;