import mongoose from "mongoose"

const smartDeviceSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    homeId: {
      type: String,
      required: true,
    },
    devices: [], // or sensors
  },
  { timestamps: true }
)

const SmartDevice = mongoose.model("SmartDevice", smartDeviceSchema)

async function checkHomeId(homeId) {
  try {
    const existingSmartHome = await SmartDevice.findOne({ homeId })
    return !!existingSmartHome
  } catch (error) {
    console.error("Error checking homeId:", error)
  }
}

export { SmartDevice, checkHomeId }
