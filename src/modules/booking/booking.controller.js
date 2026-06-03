import {Router} from 'express'
import { createBook, updateBook, deleteBook, getMyBooks, getBookById} from "./booking.service.js"
import { authMiddleware, roleMiddleware } from "../../common/middleware/auth.middleware.js"
import bookmodel from "../../database/models/book.model.js"
 

const router = Router()

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const result = await createBook(req.user.id, req.body)
    res.status(result.success ? 201 : 400).json(result)
  } catch (error) {
    next(error)
  }
})
 
router.get("/", authMiddleware, async (req, res, next) => {
   try {
     const result = await getMyBooks(req.user.id)
     res.json(result)
   } catch (error) {
     next(error)
   }
})
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const result = await getBookById(req.user.id, req.params.id)
    const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
    res.status(status).json(result)
  } catch (error) {
    next(error)
  }
})
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const result = await updateBook(req.user.id, req.params.id, req.body)
    const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
    res.status(status).json(result)
  } catch (error) {
    next(error)
  }
})
 
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const result = await deleteBook(req.user.id, req.params.id)
    const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
    res.status(status).json(result)
  } catch (error) {
    next(error)
  }
})

// Admin-only route example: Get all bookings (only for admins)
router.get("/admin/all-bookings", authMiddleware, roleMiddleware(['admin']), async (req, res, next) => {
  try {
    const result = await bookmodel.find({})
    res.json({ success: true, bookings: result })
  } catch (error) {
    next(error)
  }
})
 
export default router ;