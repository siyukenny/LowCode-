const { createLogger, format, transports, transport } = require('winston');
const { combine, timestamp, printf } = format;
const customFormat = printf((info) => {
  let { message } = info;
  if (typeof message === 'object') {
    let cache = [];
    message = JSON.stringify(message, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found
          try {
            // If this value does not reference a parent it can be deduped
            return JSON.parse(JSON.stringify(value));
          } catch (error) {
            // discard key if value cannot be deduped
            return undefined;
          }
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = [];
  }
  return `[${info.timestamp}] [${info.level}] ${message}`;
});

const logger = createLogger({
  format: combine(
    format.colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    customFormat,
  ),
  transports: [
    // new transports.File({
    //   name: 'info',
    //   filename: __dirname + '/../logs/debug.log',
    //   json: true,
    //   level:'info',
    //   maxsize: 1024 * 1024 * 10 // 10MB
    // }),
    // new transports.File({
    //   name: 'error',
    //   filename: __dirname + '/../logs/error.log',
    //   json: true,
    //   level:'error',
    //   maxsize: 1024 * 1024 * 10 // 10MB
    // }),
    new transports.File({
      name: 'network',
      filename: __dirname + '/../logs/network.log',
      json: true,
      level:'info',
      maxsize: 1024 * 1024 * 10 // 10MB
    }),
    new transports.Console()
  ],
});

module.exports = logger
