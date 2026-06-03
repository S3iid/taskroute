import {Router} from 'express'
import { createBook, updateBook, deleteBook, getMyBooks, getBookById} from "./booking.service.js"
import { authMiddleware } from "../../common/middleware/auth.middleware.js"
 

const router = Router()

router.post("/", authMiddleware, async (req, res) => {
  const result = await createBook(req.user.id, req.body)
  res.status(result.success ? 201 : 400).json(result)
})
 
router.get("/", authMiddleware, async (req, res) => {
   const result = await getMyBooks(req.user.id)
    res.json(result)
  
})
router.get("/:id", authMiddleware, async (req, res) => {

  const result = await getBookById(req.user.id, req.params.id)
    const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
    res.status(status).json(result)

})
router.put("/:id", authMiddleware, async (req, res) => {
  const result = await updateBook(req.user.id, req.params.id, req.body)
  const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
  res.status(status).json(result)
})
 
router.delete("/:id", authMiddleware, async (req, res) => {
  const result = await deleteBook(req.user.id, req.params.id)
  const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
  res.status(status).json(result)
})
 
export default router ;