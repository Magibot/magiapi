import chalk from 'chalk';
import morgan from 'morgan';
import winston from 'winston';
import appRoot from 'app-root-path';

const { NODE_ENV } = process.env;

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true
    }),
    new winston.transports.File({
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5
    })
  ],
  exitOnError: false
});

export namespace Magi.API.Application.Logger {
  export abstract class ApiConsole {
    static success = (str: string) => {
      if (NODE_ENV === 'production') {
        winstonLogger.log('info', str, { timestamp: new Date().toISOString() });
        return;
      }

      console.log(chalk.bold.green(str));
    };

    static error = (str: string) => {
      if (NODE_ENV === 'production') {
        winstonLogger.log('error', str, { timestamp: new Date().toISOString() });
        return;
      }

      console.log(chalk.bold.red(str));
    };

    static warning = (str: string) => {
      if (NODE_ENV === 'production') {
        winstonLogger.log('warn', str, { timestamp: new Date().toISOString() });
        return;
      }

      console.log(chalk.bold.yellow(str));
    };

    static normal = (str: string) => {
      if (NODE_ENV === 'production') {
        winstonLogger.log('info', str, { timestamp: new Date().toISOString() });
        return;
      }

      console.log(chalk.magenta(str));
    };

    static morganInterceptor = morgan(function(tokens, req, res) {
      let method = tokens.method(req, res);
      const statusCode = tokens.status(req, res);
      const endpoint = tokens.url(req, res);
      const responseTime = tokens['response-time'](req, res) + ' ms';

      const remoteAddress = tokens['remote-addr'](req, res);
      const referrer = 'from ' + tokens.referrer(req, res);
      const userAgent = tokens['user-agent'](req, res);

      if (NODE_ENV === 'production') {
        const str = `API REQUEST INFO: ${method} ${statusCode} ${endpoint} ${responseTime} ${referrer}`;
        winstonLogger.log('info', str, { timestamp: new Date().toISOString() });
        return;
      }

      switch (tokens.method(req, res)) {
        case 'GET':
          method = chalk.hex('#0b6608').bold('GET');
          break;
        case 'POST':
          method = chalk.hex('#cc8916').bold('POST');
          break;
        case 'PUT':
          method = chalk.hex('#22538f').bold('PUT');
          break;
        case 'PATCH':
          method = chalk.hex('#ad9758').bold('PATCH');
          break;
        case 'DELETE':
          method = chalk.hex('#c94218').bold('DELETE');
          break;
        default:
          method = chalk.hex('#34ace0').bold(tokens.method(req, res));
          break;
      }

      return [
        chalk.bold.cyanBright('\nAPI Request Info:'),
        method,
        chalk.greenBright(statusCode),
        chalk.hex('#ff5252')(endpoint),
        chalk.hex('#2ed573').bold(responseTime),
        chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
        chalk.yellow(remoteAddress),
        chalk.hex('#fffa65').bold(referrer),
        chalk.hex('#1e90ff')(userAgent)
      ].join(' ');
    });
  }
}

export default Magi.API.Application.Logger;
