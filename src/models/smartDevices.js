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
      },
      fan: {
        type: Boolean,
        required: true,
      },
    },
  },
  { timestamps: true }
)

const SmartHome = mongoose.model("SmartHome", smartHomeSchema)

async function checkHomeId(homeId) {
  try {
    const existingSmartHome = await SmartDevice.findOne({ homeId })
    return !!existingSmartHome
  } catch (error) {
    console.error("Error checking homeId:", error)
  }
}

export { checkHomeId, SmartHome }
