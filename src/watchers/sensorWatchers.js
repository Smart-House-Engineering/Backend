import { getControlCommand } from "../utils/controlCommands.js"
import { SmartHome } from "../models/smartDevices.js"

export const sensorWatchers = async io => {
  const changeStream = SmartHome.watch()

  changeStream.on("change", event => {
    try {
      if (event.operationType === "update") {
        // const { _id: homeID } = event.documentKey
        const updatedFields = event.updateDescription.updatedFields
        for (const [key, value] of Object.entries(updatedFields)) {
          const device = getDeviceFromKey(key)
          const command = getControlCommand(device, value)

          if (command !== null) {
            console.log(command)
            io.emit("message", command)
          }
        }
      }
    } catch (error) {
      console.error("Error handling change event: ", error)
    }
  })
}

const getDeviceFromKey = key => key.split(".").pop()
