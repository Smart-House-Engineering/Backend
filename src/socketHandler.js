export const socketHandler = io => {
  io.on("connection", socket => {
    console.log("A client connected")

    // Handle events from the client
    socket.on("message", data => {
      const sensorData = JSON.parse(data)
      console.log(sensorData)
      socket.emit("dataReceived", { status: "success" })

      // Output
      // {"gasSensorVal":190,"steamSensorVal":33,"soilSensorVal":1,"PIRMotionVal":1,
      // "whiteLedVal":0,"yellowLedVal":1023,"relayVal":0,"fanVal":1,"reverseFanVal":1}

      // socket.emit("message", "a")
    })

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  })
}
