import mongoose from "mongoose"

const smartHomeSchema = new mongoose.Schema(
  {
    homeId: {
      type: String,
      required: true,
      unique: true,
    },
    devices: {
      fan: {
        type: Boolean,
        required: true,
        default: false,
      },
      RFan: {
        type: Boolean,
        required: true,
        default: false,
      },
      motion: {
        type: Boolean,
        required: true,
        default: false,
      },
      buzzer: {
        type: Boolean,
        required: true,
        default: false,
      },
      relay: {
        type: Boolean,
        required: true,
        default: false,
      },
      door: {
        type: Number,
        required: true,
        default: 0,
      },
      window: {
        type: Number,
        required: true,
        default: 0,
      },
      yellowLed: {
        type: Number,
        required: true,
        default: 0,
      },
      gasSensor: {
        type: Number,
        required: true,
        default: 0,
      },
      photocell: {
        type: Number,
        required: true,
        default: 0,
      },
      soilSensor: {
        type: Number,
        required: true,
        default: 0,
      },
      steamSensor: {
        type: Number,
        required: true,
        default: 0,
      },
      whiteLed: {
        type: Boolean,
        required: true,
        default: false,
      },
      button1: {
        type: Boolean,
        required: true,
        default: false,
      },
      button2: {
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

async function getDevices(homeId) {
  try {
    const smartHome = await SmartHome.findOne({ homeId })
    if (!smartHome) {
      return null // If no home was found
    }
    return smartHome.devices
  } catch (error) {
    console.error("Error retrieving devices:", error)
    throw error // Rethrow the error to handle it in the route
  }
}

export { updateDevices, checkHomeId, getDevices, SmartHome }
