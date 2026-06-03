import bookmodel from "../../database/models/book.model.js"

export const createBook = async (userid, data) => {
  let { title, bookingDate } = data
  if (!bookingDate || new Date(bookingDate) < new Date()) {
    throw { statusCode: 400, message: "Booking date cannot be in the past" }
  }
  let addedbook = await bookmodel.create({ title, bookingDate, userid })
  if (addedbook) {
    return { message: "book created", addedbook }
  } else {
    throw { statusCode: 500, message: "Failed to create booking" }
  }
}

export const getMyBooks = async (userId) => {
  let books = await bookmodel.find({ userid: userId })
  return { success: true, books }
}

export const getBookById = async (userId, bookId) => {
  let book = await bookmodel.findById(bookId)
  if (!book) {
    throw { statusCode: 404, message: "book not found" }
  }
  if (book.userid.toString() !== userId) {
    throw { statusCode: 403, message: "not authorized" }
  }
  return { success: true, book }
}

export const updateBook = async (userid, bookid, data) => {
  let book = await bookmodel.findById(bookid)
  if (!book) {
    throw { statusCode: 404, message: "book not found" }
  }
  if (book.userid.toString() !== userid) {
    throw { statusCode: 403, message: "not authorized" }
  }
  if (book.status === "cancelled") {
    throw { statusCode: 400, message: "cannot update cancelled booking" }
  }
  let updatedbook = await bookmodel.findByIdAndUpdate(bookid, data, { returnDocument: 'after' })

  if (updatedbook) {
    return { message: "book updated", updatedbook }
  } else {
    throw { statusCode: 500, message: "Failed to update booking" }
  }
}
export const deleteBook = async (userid, bookid) => {
  let book = await bookmodel.findById(bookid)
  if (!book) {
    throw { statusCode: 404, message: "book not found" }
   }
  if (book.userid.toString() !== userid) {
    throw { statusCode: 403, message: "not authorized" }
  }
  let cancelledbook = await bookmodel.findByIdAndUpdate(bookid, { status: "cancelled" }, { returnDocument: 'after' })
  return { success: true, message: "book cancelled", cancelledbook }
}
