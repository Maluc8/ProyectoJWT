import winston from 'winston';
const customLevelsOptions = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5
  },
  colors: {
    debug: 'blue',
    http: 'light blue',
    info: 'white',
    warning: 'yellow',
    error: 'orange',
    fatal: 'red'
  }
};

const logger = new winston.createLogger({
    transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'error'
    })
  ]
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  // console.log('logger addLogger\n');
  req.logger.http(
    `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};
