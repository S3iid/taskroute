import postmodel from "../../database/models/post.model.js"

export const createPost = async (userid, data) => {
  let { title, content } = data
  let addedpost = await postmodel.insertOne({ title, content, userid })
  if (addedpost) {
    return { message: "post created", addedpost }
  } else {
    return { message: "something incorrect" }
  }
}

export const updatePost = async (userid, postid, data) => {
  let post = await postmodel.findById(postid)
  if (!post) {
    return { message: "post not found" }
  }
  if (post.userid.toString() !== userid) {
    return { message: "not authorized" }
  }
  let updatedpost = await postmodel.findByIdAndUpdate(postid, data, { new: true })
  if (updatedpost) {
    return { message: "post updated", updatedpost }
  } else {
    return { message: "post not found" }
  }
}
export const deletePost = async (userid, postid) => {
  let post = await postmodel.findById(postid)
  if (!post) {
    return { message: "post not found" }
  }
  if (post.userid.toString() !== userid) {
    return { message: "not authorized" }
  }
  let deletedpost = await postmodel.findByIdAndDelete(postid)
  if (deletedpost) {
    return { message: "post deleted", deletedpost }
  } else {
    return { message: "post not found" }
  }
}
 