import chalk from 'chalk';
import morgan from 'morgan';

export namespace Magi.API.Application.Logger {
  export abstract class ApiConsole {
    static success = (str: string) => {
      console.log(chalk.bold.green(str));
    };

    static error = (str: string) => {
      console.log(chalk.bold.red(str));
    };

    static warning = (str: string) => {
      console.log(chalk.bold.yellow(str));
    };

    static normal = (str: string) => {
      console.log(chalk.magenta(str));
    };

    static morganInterceptor = morgan(function(tokens, req, res) {

      let method;
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
        chalk.greenBright(tokens.status(req, res)),
        chalk.hex('#ff5252')(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
        chalk.yellow(tokens['remote-addr'](req, res)),
        chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
        chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
      ].join(' ');
    });
  }
}

export default Magi.API.Application.Logger;
