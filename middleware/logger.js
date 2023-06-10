const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// console.log(format(new Date(), "yyyy-mm-dd\tHH:mm:ss"));
// console.log(uuid());

const logEvents = (message, file) => {
  const date = `${format(new Date(), "yyyy-mm-dd\tHH-mm-ss")}`;
  const logMessage = `${date}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs")))
      fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    fsPromises.appendFile(path.join(__dirname, "..", "logs", file), logMessage);
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  let origin = req.headers.origin;
  if (!req.headers.origin) origin = "localhost";
  logEvents(`${req.url}\t${origin}\t${req.method}`, "reqLog.txt");
  console.log(`${req.method}\t${req.path}`);
  next();
};

module.exports = { logEvents, logger };
