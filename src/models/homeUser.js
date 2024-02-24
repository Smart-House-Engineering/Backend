import mongoose from "mongoose"

const homeUserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  role: {
    type: String,
    enum: ["OWNER", "EXTERNAL"],
    required: true,
  },
  homeId: {
    type: String,
    required: true,
  },
})

const HomeUser = mongoose.model("homeUser", homeUserSchema)

async function getUserByEmail(email) {
  try {
    const user = await HomeUser.findOne({ email: email })
    return user
  } catch (error) {
    console.error("Error finding user by email:", error)
  }
}

async function createUserAccount(userData) {
  try {
    const newUser = new HomeUser(userData)
    await newUser.save()
    return newUser
  } catch (error) {
    console.error("Error creating user account:", error)
  }
}

async function getUserPasswordForLogin(email) {
  const userPass = await HomeUser.findOne({ email }).select("password")
  if (!userPass) return ""
  else return userPass.password
}

export { HomeUser, getUserByEmail, createUserAccount, getUserPasswordForLogin }
