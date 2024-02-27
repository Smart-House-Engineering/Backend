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

async function updateDevices(homeId, updatedDevices) {
  try {
    // Making sure the set adapts based on devices so they won't default to false
    const updateObject = {}
    for (const [key, value] of Object.entries(updatedDevices)) {
      updateObject[`devices.${key}`] = value
    }

    const result = await SmartHome.findOneAndUpdate(
      { homeId },
      { $set: updateObject },
      { new: true } // Return the updated document
    )
    return result
  } catch (error) {
    console.error("Error updating devices:", error)
  }
}

export { updateDevices, checkHomeId, SmartHome }
