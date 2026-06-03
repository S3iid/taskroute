import bookmodel from "../../database/models/book.model.js"

export const createBook = async (userid, data) => {
  let { title, bookingDate } = data
  if (!bookingDate || new Date(bookingDate) < new Date()) {
    return { success: false, message: "Booking date cannot be in the past" }
  }
  let addedbook = await bookmodel.insertOne({ title, bookingDate, userid })
  if (addedbook) {
    return { message: "book created", addedbook }
  } else {
    return { message: "something incorrect" }
  }
}

export const getMyBooks = async (userId) => {
  let books = await bookmodel.find({ userId })
  return { success: true, books }
}

export const getBookById = async (userId, bookId) => {
  let book = await bookmodel.findById(bookId)
  if (!book) {
    return { success: false, message: "book not found" }
  }
  if (book.userid.toString() !== userId) {
    return { success: false, message: "not authorized" }
  }
  return { success: true, book }
}

export const updateBook = async (userid, bookid, data) => {
  let book = await bookmodel.findById(bookid)
  if (!book) {
    return { message: "book not found" }
  }
  if (book.userid.toString() !== userid) {
    return { message: "not authorized" }
  }
  if (book.status === "cancelled") {
    return { message: "cannot update cancelled booking" }
  }
  let updatedbook = await bookmodel.findByIdAndUpdate(bookid, data, { new: true })

  if (updatedbook) {
    return { message: "book updated", updatedbook }
  } else {
    return { message: "book not found" }
  }
}
export const deleteBook = async (userid, bookid) => {
  let book = await bookmodel.findById(bookid)
  if (!book) {
    return { success: false, message: "book not found" }
   }
  if (book.userid.toString() !== userid) {
    return { success: false, message: "not authorized" }
  }
  let cancelledbook = await bookmodel.findByIdAndUpdate(bookid, { status: "cancelled" }, { new: true })
  return { success: true, message: "book cancelled", cancelledbook }
}
