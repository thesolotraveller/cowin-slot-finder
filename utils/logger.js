const colorsToCode = {
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgBlue: "\x1b[44m",
}

const log = (...messages) => console.log(...messages);
const logInfo = (...messages) => console.log(colorsToCode["FgBlue"], ...messages);
const logSuccess = (...messages) => console.log(colorsToCode["FgGreen"], ...messages);
const logError = (...messages) => console.log(colorsToCode["FgRed"], ...messages);

module.exports = {
  log,
  logInfo,
  logSuccess,
  logError
};
