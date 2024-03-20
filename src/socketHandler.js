export const socketHandler = io => {
  io.on("connection", socket => {
    console.log("A client connected")

    // Handle events from the client
    socket.on("message", data => {
      const sensorData = JSON.parse(data)
      // Update data in database
      console.log(sensorData)

      // Output
      // {
      //   gasSensorVal: 190,
      //   steamSensorVal: 33,
      //   soilSensorVal: 1,
      //   PIRMotionVal: 1,
      //   whiteLedVal: 0,
      //   yellowLedVal: 1023,
      //   relayVal: 0,
      //   fanVal: 1,
      //   reverseFanVal: 1
      // }

      socket.emit("dataReceived", { status: "success" })
    })

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  })
}
