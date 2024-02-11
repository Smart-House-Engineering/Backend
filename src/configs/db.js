import mongoose from "mongoose"

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log("Connected to DB successfully")
  } catch (err) {
    console.log(err)
  }
}
