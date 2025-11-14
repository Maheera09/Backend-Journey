/*This code creates a custom Winston logger that:
Writes logs to the console (with colors + formatted output)
Writes logs into a file named app.log
Allows you to control the format of logs
Lets you specify log levels like "info", "error", etc.*/

import { createLogger, format, transports } from "winston";
//create logger is used to create customized loggers
//we are also modifying the format i.e how do we want to see the data
//Transports decide where your logs will be sent and are used to take data from one main point to another main point like you want to transport data into console logs or maybe you want to send that into some files.

const { combine, timestamp, json, colorize } = format;
/*Here you take only the formatting functions you need:
combine() → join multiple formats together
timestamp() → adds the date/time to log messages
json() → formats the log as a JSON object
colorize() → adds colors to console logs*/

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}:${message}`;
  })
);
//we are making a customized format i.e. consoleLogFormat so that every log comes up in precise and expected log information

//creating a winston logger
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    //Transports tell Winston where to send logs.
    new transports.Console({
      format: consoleLogFormat, //Console will use your custom format
    }),
    new transports.File({ filename: "app.log" }),
    //Create a file called app.log and save logs into this file
  ],
});

export default logger;
