import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "Pending", "borrowed", "cancelled"],
      default: "Pending",
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bookingDate: {
      required: true,
      type: Date,
        validate: {
          validator: function (value) {            return value >= new Date()
          }
        }
    },

  },
  { timestamps: true }
)

const bookmodel = mongoose.model("book", bookSchema)  // ← was "userschema" (bug)

export default bookmodel