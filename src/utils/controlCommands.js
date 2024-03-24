export const ControlCommands = {
  fan: { on: "r", off: "s" },
  relay: { on: "c", off: "d" },
  yellowLed: { on: "p", off: "q" },
  whiteLed: { on: "a", off: "b" },
  door: { on: "l", off: "m" },
  window: { on: "n", off: "o" },
  RFan: {},
  motion: {},
  buzzer: {},
  gasSensor: {},
  photocell: {},
  soilSensor: {},
  steamSensor: {},
  button1: {},
  button2: {},
}

export const getControlCommand = (device, value) => {
  const deviceCommands = ControlCommands[device]

  if (deviceCommands) {
    return value ? deviceCommands.on : deviceCommands.off
  }

  return null
}
