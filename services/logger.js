const colorsToCode = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgBlue: "\x1b[44m",
}

const log = (...messages) => console.log(Date.now(), ...messages);
const logInfo = (...messages) => console.log(colorsToCode["FgYellow"], Date.now(), " -> ", ...messages);
const logSuccess = (...messages) => console.log(colorsToCode["FgGreen"], Date.now(), " -> ", ...messages);
const logError = (...messages) => console.log(colorsToCode["FgRed"], Date.now(), " -> ", ...messages);

module.exports = {
  log,
  logInfo,
  logSuccess,
  logError
};
