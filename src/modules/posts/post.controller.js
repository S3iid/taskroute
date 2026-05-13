import {Router} from 'express'
import { createPost, updatePost, deletePost } from "./post.service.js"
import { authMiddleware } from "../../common/middleware/auth.js"
 

const router = Router()

router.post("/createposts", authMiddleware, async (req, res) => {
  const result = await createPost(req.user.id, req.body)
  res.status(result.success ? 201 : 400).json(result)
})
 
router.put("/updatepostsbyid/:id", authMiddleware, async (req, res) => {
  const result = await updatePost(req.user.id, req.params.id, req.body)
  const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
  res.status(status).json(result)
})
 
router.delete("/deletepostbyid/:id", authMiddleware, async (req, res) => {
  const result = await deletePost(req.user.id, req.params.id)
  const status = result.success ? 200 : result.message.includes("authorized") ? 403 : 404
  res.status(status).json(result)
})
 
export default router ;