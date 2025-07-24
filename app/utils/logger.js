const winston = require('winston');
const { createLogger, format, transports } = winston;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console(), 
  ],
});

module.exports = logger;