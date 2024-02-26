import mongoose from "mongoose"

const smartHomeSchema = new mongoose.Schema(
  {
    homeId: {
      type: String,
      required: true,
      unique: true,
    },
    devices: {
      lights: {
        type: Boolean,
        required: true,
        default: false,
      },
      fan: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  },
  { timestamps: true }
)

const SmartHome = mongoose.model("SmartHome", smartHomeSchema)

async function checkHomeId(homeId) {
  try {
    const existingSmartHome = await SmartHome.findOne({ homeId })
    return !!existingSmartHome
  } catch (error) {
    console.error("Error checking homeId:", error)
  }
}

export { checkHomeId, SmartHome }
