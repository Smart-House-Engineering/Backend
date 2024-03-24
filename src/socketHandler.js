export const socketHandler = io => {
  io.on("connection", socket => {
    console.log("A client connected")

    socket.on("message", data => {
      const sensorData = JSON.parse(data)
      console.log(sensorData)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  })
}
